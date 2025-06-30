import { useState } from 'react';
import { login as loginRequest } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginRequest(form);
      login(res.accessToken);
      const { role } = JSON.parse(atob(res.accessToken.split('.')[1]));
      navigate(role === 'admin' ? '/admin/dashboard' : '/todos');
    } catch (err: any) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-4 space-y-2" onSubmit={onSubmit}>
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
