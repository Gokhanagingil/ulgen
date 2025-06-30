import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">
        {role === 'admin' ? 'Admin Panel' : 'Todo App'}
      </div>
      <button onClick={onLogout} className="text-sm hover:underline">
        Logout
      </button>
    </div>
  );
}
