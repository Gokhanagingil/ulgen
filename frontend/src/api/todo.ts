import api from './axios';

export async function fetchTodos(tenantId: number) {
  const { data } = await api.get(`/todos`, { params: { tenantId } });
  return data;
}

export async function addTodo(tenantId: number, title: string) {
  const { data } = await api.post(`/todos?tenantId=${tenantId}`, { title });
  return data;
}
