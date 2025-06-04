import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bolsabackend.ticocr.org/api', // o tu endpoint
  withCredentials: true, // si usás Sanctum para auth
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


export default api;