import api from './axios';

export async function signup(data: { username: string; email: string; password: string; tenantId: number }) {
  return (await api.post('/auth/signup', data)).data;
}

export async function login(data: { email: string; password: string }) {
  return (await api.post('/auth/login', data)).data;
}
