import api from './api';
import Cookies from 'js-cookie';
import { AuthResponse, User } from '@/types/car';

// ---------- TOKEN MANAGEMENT ----------
export const setTokens = (access: string, refresh: string) => {
  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const clearTokens = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// ---------- USER MANAGEMENT ----------
export const setUser = (user: User) => {
  Cookies.set('user', JSON.stringify(user));
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
  Cookies.remove('user');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const cookieUser = Cookies.get('user');
  const localUser = localStorage.getItem('user');
  const userData = cookieUser || localUser;

  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    clearUser();
    return null;
  }
};

// ---------- AUTH STATUS ----------
export const isAuthenticated = (): boolean => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  const user = getCurrentUser();
  return !!(token && user);
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  return !!(user.is_staff || user.is_superuser);
};

export const getAuthToken = (): string | null => {
  return Cookies.get('access_token') || localStorage.getItem('access_token');
};

// ---------- FETCH USER ----------
export const fetchAndUpdateUser = async (): Promise<User | null> => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const { data } = await api.get('/auth/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(data);
    return data;
  } catch (error) {
    console.error('fetchAndUpdateUser error:', error);
    logout(); // clear invalid tokens
    return null;
  }
};

// ---------- LOGIN ----------
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login/', { username, password });
  const { access, refresh } = response.data;

  setTokens(access, refresh);

  const user = await fetchAndUpdateUser();
  return { access, refresh, user };
};

// ---------- REGISTER ----------
export const register = async (
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string
): Promise<AuthResponse> => {
  const response = await api.post(
    '/auth/register/',
    { username, email, password, first_name, last_name },
    { withCredentials: true }
  );

  const { access, refresh, user } = response.data;
  setTokens(access, refresh);
  setUser(user);

  return { access, refresh, user };
};

// ---------- LOGOUT ----------
export const logout = async (): Promise<void> => {
  const refreshToken = Cookies.get('refresh_token');
  if (refreshToken) {
    try {
      await api.post('/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  clearTokens();
  clearUser();

  // Optional: clear other storage if needed
  localStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('isAuthenticated');

  // Redirect
  window.location.href = '/';
};
export type { User };

