import axios from 'axios';

export const viacep = axios.create({
  baseURL: 'http://viacep.com.br/ws/',
});

export const backend = axios.create({
  baseURL: 'https://sollar-backend.herokuapp.com/api',
});
