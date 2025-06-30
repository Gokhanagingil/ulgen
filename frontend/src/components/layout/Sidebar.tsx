import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { role } = useAuth();
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block p-2 rounded ${isActive ? 'bg-gray-300 font-bold' : ''}`;

  return (
    <div className="w-48 bg-gray-200 min-h-screen p-4 space-y-2">
      <NavLink to="/todos" className={linkClass}>
        Todos
      </NavLink>
      {role === 'admin' && (
        <>
          <NavLink to="/admin/dashboard" className={linkClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/tables" className={linkClass}>
            Tables
          </NavLink>
          <NavLink to="/admin/settings" className={linkClass}>
            Settings
          </NavLink>
          <NavLink to="/admin/logs" className={linkClass}>
            Logs
          </NavLink>
        </>
      )}
    </div>
  );
}

