import client from './client';

export async function fetchLogs(tenantId: number) {
  const { data } = await client.get(`/admin/logs`, { params: { tenantId } });
  return data;
}

