import { useEffect, useState } from 'react';
import { fetchTodos, addTodo } from '../api/todo';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const navigate = useNavigate();
  const tenantId = 1; // demo tenant
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchTodos(tenantId).then(setTodos);
  }, [navigate]);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo(tenantId, title);
    setTitle('');
    const latest = await fetchTodos(tenantId);
    setTodos(latest);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <form onSubmit={onAdd} className="space-x-2 mb-4">
        <input className="border p-2" value={title} onChange={e => setTitle(e.target.value)} />
        <button className="bg-green-600 text-white px-3 py-2" type="submit">Add</button>
      </form>
      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="border p-2 rounded" >{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
