
import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const loginUser = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

// User services
export const getUsers = (page: number = 1) => {
  return api.get(`/users?page=${page}`);
};

export const getUserById = (id: number) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id: number, userData: { first_name: string; last_name: string; email: string }) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface PaginatedResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export default api;
