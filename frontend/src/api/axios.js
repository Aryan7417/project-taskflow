import axios from 'axios';

const api = axios.create({
  baseURL: window.location.origin.includes('https://project-taskflow.onrender.com')
    ? '/api'
    : 'https://project-taskflow.onrender.com',
  withCredentials: true,
});

export default api;
