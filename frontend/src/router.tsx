import { BrowserRouter, Navigate, Outlet, useRoutes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todos from './pages/Todos';
import Dashboard from './pages/admin/Dashboard';
import Tables from './pages/admin/Tables';
import Settings from './pages/admin/Settings';
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

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== 'admin') {
    return <Navigate to="/todos" replace />;
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
    <div>
      <Topbar />
      <div className="p-4">
        <Todos />
      </div>
    </div>
  );
}

function AppRoutes() {
  const routes = useRoutes([
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
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
        <RequireAdmin>
          <AdminLayout />
        </RequireAdmin>
      ),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'tables', element: <Tables /> },
        { path: 'settings', element: <Settings /> },
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
