import { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const api = axios.create({ baseURL: 'http://localhost:3000' });

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const res = await api.get<Todo[]>('/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    await api.post('/todos', { title });
    setTitle('');
    load();
  };

  const toggle = async (todo: Todo) => {
    await api.patch(`/todos/${todo.id}`, { completed: !todo.completed });
    load();
  };

  const remove = async (id: number) => {
    await api.delete(`/todos/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border flex-grow p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={t.completed}
              onChange={() => toggle(t)}
            />
            <span className={`flex-grow ${t.completed ? 'line-through' : ''}`}>{t.title}</span>
            <button className="text-red-500" onClick={() => remove(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
