import axios from 'axios';

const baseURL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL,
  withCredentials: true,
});

export default client;
