import axios from 'axios';

const api = axios.create({
  baseURL: window.location.origin.includes('localhost:5173')
    ? '/api'
    : 'https://project-taskflow.onrender.com',
  withCredentials: true,
});

export default api;
