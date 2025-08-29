import axios from 'axios';
// import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch a single car detail
export const getCarDetail = async (slug: string) => {
  const response = await api.get(`/cars/${slug}/`);
  return response.data;
};

// Fetch related cars by make (backend already updated)
export const getRelatedCars = async (slug: string) => {
  const response = await api.get(`/cars/${slug}/related/`);
  return response.data;
};
