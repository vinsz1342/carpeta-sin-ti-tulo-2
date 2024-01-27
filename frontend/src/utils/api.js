import axios from 'axios';
import { setStorageObject, setUserSession, getUserToken } from '../utils/localStorage.utils'; 

// Configuración de Axios
export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = getUserToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// Función para iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    console.log(response)
    // setStorageObject("user-session", response.data)
    setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    setStorageObject("token", response.data.token)
    setStorageObject("user", response.data.user)
    // setUserSession({ token: response.data.token, user: response.data.user });
    return response.data;
  } catch (error) {
    console.error('Error durante el registro:', error);
    throw error;
  }
};

export const objectToQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return queryString;
};
