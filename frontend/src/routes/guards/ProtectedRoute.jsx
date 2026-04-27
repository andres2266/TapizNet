
import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores/auth';
export default function ProtectedRoute() {
  const token = authStore((state) => state.token);

  if (!token) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}
