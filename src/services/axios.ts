import axios from 'axios';

import LOCALSTORAGE from '../helpers/constants/localStorage';

export const viacep = axios.create({
  baseURL: 'http://viacep.com.br/ws/',
});

export const apiSollar = axios.create({
  baseURL: 'https://sollar-backend.herokuapp.com/api',
});

apiSollar.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem(LOCALSTORAGE.TOKEN);

    if (token) {
      config.headers.token = `${token}`;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
