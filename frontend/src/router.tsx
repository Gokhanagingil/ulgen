import { BrowserRouter, Navigate, Outlet, useRoutes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todos from './pages/Todos';
import Dashboard from './pages/admin/Dashboard';
import Tables from './pages/admin/Tables';
import Settings from './pages/admin/Settings';
import Logs from './pages/admin/Logs';
import Unauthorized from './pages/Unauthorized';
import Forbidden from './pages/Forbidden';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function TodoLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-4">
          <Todos />
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const routes = useRoutes([
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/unauthorized', element: <Unauthorized /> },
    { path: '/forbidden', element: <Forbidden /> },
    {
      path: '/todos',
      element: (
        <RequireAuth>
          <TodoLayout />
        </RequireAuth>
      ),
    },
    {
      path: '/admin',
      element: (
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      ),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'tables', element: <Tables /> },
        { path: 'settings', element: <Settings /> },
        { path: 'logs', element: <Logs /> },
        { index: true, element: <Navigate to="dashboard" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/login" replace /> },
  ]);

  return routes;
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
