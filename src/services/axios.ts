import axios from 'axios';
import { toast } from 'react-toastify';

import LOCALSTORAGE from '../helpers/constants/localStorage';

export const viacep = axios.create({
  baseURL: process.env.REACT_APP_VIACEP_API,
});

export const apiSollar = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

export const ibge = axios.create({
  baseURL: process.env.REACT_APP_IBGE_API,
});

apiSollar.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
    const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || '';
    const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || '';

    if (token) {
      config.headers.token = `${token}`;
      config.headers.user = JSON.stringify({ id: user_id, username });
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiSollar.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) return;

    const { err } = error.response.data;
    if (err?.name === 'TokenExpiredError') {
      localStorage.removeItem(LOCALSTORAGE.TOKEN);
      localStorage.setItem(LOCALSTORAGE.EXPIRED_SESSION, JSON.stringify(err));
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
