import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  // console.log('API Request - Token exists:', !!token);
  // console.log('API Request - URL:', config.url);
  // console.log('Access token in storage:', Cookies.get('access_token'), localStorage.getItem('access_token'));

  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('API Request - Authorization header set');
  } else {
    console.log('API Request - No token found');
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API Response Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('401 Error - Attempting token refresh');
      const refreshToken = Cookies.get('refresh_token') || localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          console.log('Refreshing token...');
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          Cookies.set('access_token', access);
          localStorage.setItem('access_token', access);
          console.log('Token refreshed successfully');
          error.config.headers.Authorization = `Bearer ${access}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.log('Token refresh failed:', refreshError);
          // Clear all auth data on refresh failure
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          Cookies.remove('user');
          Cookies.remove('user_data');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          localStorage.removeItem('user_data');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('user_data');
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;