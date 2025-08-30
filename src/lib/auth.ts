import api from './api';
import Cookies from 'js-cookie';
import { AuthResponse, User } from '@/types/car';

// export const login = async (username: string, password: string): Promise<AuthResponse> => {
//   const response = await api.post('/auth/login/', { username, password });
//   const { access, refresh, user } = response.data;
  
//   console.log('🔍 Login response:', { access: !!access, refresh: !!refresh, user });
  
//   // Clear any existing tokens first
//   Cookies.remove('access_token');
//   Cookies.remove('refresh_token');
//   Cookies.remove('user');
//   localStorage.removeItem('user');
//   sessionStorage.removeItem('user');
  
//   // Set new tokens with proper options
//   Cookies.set('access_token', access);
//   Cookies.set('refresh_token', refresh);
//   Cookies.set('user', JSON.stringify(user));
  
//   // Also store in localStorage as backup
//   localStorage.setItem('user', JSON.stringify(user));
//   localStorage.setItem('access_token', access);
//   localStorage.setItem('refresh_token', refresh);
  
//   console.log('✅ Tokens stored successfully');
  
//   return response.data;
// };

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  // Request login to get tokens
  const response = await api.post('/auth/login/', { username, password });
  const { access, refresh } = response.data; // Ignore 'user' from login response

  console.log('Login response:', { access: !!access, refresh: !!refresh });

  // Clear any old auth data
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');

  // Store tokens
  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);

  console.log('Tokens stored successfully, fetching full profile...');

  //Fetch latest user profile (with first_name, last_name, etc.)
  const fetchedUser = await fetchAndUpdateUser();

  //Return complete auth response
  return { access, refresh, user: fetchedUser };
};


export const register = async (username: string, email: string, password: string, first_name: string, last_name: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register/', { username, email, password, first_name, last_name });
  const { access, refresh, user } = response.data;
  
  // Clear any existing tokens first
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  
  // Set new tokens with proper options
  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  Cookies.set('user', JSON.stringify(user));
  
  // Also store in localStorage as backup
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('access_token', access);
  
  return response.data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = Cookies.get('refresh_token');
  if (refreshToken) {
    try {
      await api.post('/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  // Clear all authentication data from cookies
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  
  // Clear all authentication data from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('user_data'); //  clear it here too
  
  // Clear all authentication data from sessionStorage
// Clear all authentication data from sessionStorage
sessionStorage.removeItem('access_token');
sessionStorage.removeItem('refresh_token');
sessionStorage.removeItem('user');
sessionStorage.removeItem('user_data'); //  clear it here too

  // Clear any other potential auth-related data
  localStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('isAuthenticated');
  
  // Redirect to home page
  window.location.href = '/';
};


export const getCurrentUser = (): User | null => {
  // Try cookies first, then localStorage as fallback
  let userCookie = Cookies.get('user');
  if (!userCookie) {
    userCookie = localStorage.getItem('user') ?? undefined;
  }
  
  console.log('getCurrentUser - userCookie:', userCookie);
  
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      console.log(' getCurrentUser - parsed user:', user);
      return user;
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear corrupted data
      Cookies.remove('user');
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  const user = getCurrentUser();
  console.log('isAuthenticated - token exists:', !!token, 'user exists:', !!user);
  return !!(token && user);
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  if (!user || !authenticated) {
    console.log("isAdmin: No user or not authenticated", { user, authenticated });
    return false;
  }

  // Must be staff or superuser to be admin
  const adminStatus = Boolean(user.is_staff || user.is_superuser);

  console.log("isAdmin check:", {
    username: user.username,
    is_staff: user.is_staff,
    is_superuser: user.is_superuser,
    adminStatus,
    token: !!getAuthToken()
  });

  return adminStatus;
};


export const getAuthToken = (): string | null => {
  return Cookies.get('access_token') || localStorage.getItem('access_token');
};


export const fetchAndUpdateUser = async (): Promise<User> => {
  const { data } = await api.get('/auth/profile/'); // CookieJWTAuthentication will read from cookie
  // Update cookies & localStorage
  Cookies.set('user', JSON.stringify(data));
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};