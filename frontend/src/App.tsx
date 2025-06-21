import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos?tenantId=1')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="border p-2 rounded">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
