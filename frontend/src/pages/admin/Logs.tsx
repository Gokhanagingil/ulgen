import { useEffect, useState } from 'react';
import { fetchLogs } from '../../api/admin';

export default function Logs() {
  const [logs, setLogs] = useState<any[] | null>(null);
  const tenantId = 1;

  useEffect(() => {
    fetchLogs(tenantId).then(setLogs);
  }, []);

  if (logs === null) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Logs</h1>
      {logs.length === 0 ? (
        <div>No logs</div>
      ) : (
        <ul className="space-y-2">
          {logs.map((l) => (
            <li key={l.id} className="border p-2 rounded">
              {l.method} {l.path}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

