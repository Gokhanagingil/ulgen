import client from './client';

export async function fetchTodos(tenantId: number) {
  const { data } = await client.get(`/todos`, { params: { tenantId } });
  return data;
}

export async function addTodo(tenantId: number, title: string) {
  const { data } = await client.post(`/todos?tenantId=${tenantId}`, { title });
  return data;
}
