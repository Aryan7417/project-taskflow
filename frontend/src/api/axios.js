// import axios from 'axios';

// const api = axios.create({
//   baseURL: window.location.origin.includes('localhost')
//     ? 'http://localhost:5000/api'
//     : 'https://project-taskflow.onrender.com',
//   withCredentials: true,
// });

// export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     window.location.hostname === "localhost"
//       ? "http://localhost:5000/api"
//       : "https://project-taskflow.onrender.com/api",
//   withCredentials: true,
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://project-taskflow.onrender.com/api",
  withCredentials: true,
});

export default api;