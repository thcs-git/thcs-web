import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sollar-backend.herokuapp.com/api',
});

// instance.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     const token = localStorage.getItem(STORAGE.AUTH_TOKEN);

//     if (token) {
//       config.headers.Authorization = `jwt ${token}`;
//     }

//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// iterceptors

export default api;
