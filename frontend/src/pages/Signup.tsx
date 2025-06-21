import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', tenantId: 1 });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(form);
    navigate('/login');
  };

  return (
    <form className="p-4 space-y-2" onSubmit={onSubmit}>
      <input className="border p-2 w-full" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <input className="border p-2 w-full" type="number" placeholder="Tenant ID" value={form.tenantId} onChange={e => setForm({ ...form, tenantId: Number(e.target.value) })} />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Signup</button>
    </form>
  );
}
