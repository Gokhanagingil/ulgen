import client from './client';

export async function signup(data: { username: string; email: string; password: string; tenantId: number }) {
  return (await client.post('/auth/signup', data)).data;
}

export async function login(data: { email: string; password: string }) {
  return (await client.post('/auth/login', data, { withCredentials: true })).data;
}
