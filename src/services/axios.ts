import axios from 'axios';

export const viacep = axios.create({
  baseURL: 'http://viacep.com.br/ws/',
});

