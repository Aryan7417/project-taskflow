import axios from 'axios';

const api = axios.create({
  baseURL: window.location.origin.includes('localhost:5173')
    ? '/api'
    : 'http://localhost:5000/api',
  withCredentials: true,
});

export default api;
