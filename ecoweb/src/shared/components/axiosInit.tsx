import axios from 'axios';

// Configuración base de axios
export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // Ajusta según tu entorno
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});