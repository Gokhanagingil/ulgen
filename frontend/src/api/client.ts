import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const status = err.response.status;
      if (status === 401) {
        window.location.href = '/unauthorized';
      } else if (status === 403) {
        window.location.href = '/forbidden';
      }
    }
    return Promise.reject(err);
  },
);

export default client;

