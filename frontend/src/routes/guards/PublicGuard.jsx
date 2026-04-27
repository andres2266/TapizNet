import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores/auth';

export function PublicGuard() {
  const empleado = authStore((state) => state.empleado);

  // Si NO está autenticado, deja pasar (muestra login/register)
  if (!empleado) return <Outlet />;

  // Si ya está autenticado, redirige según su rol
  return empleado.rol === "operario"
    ? <Navigate to="/mis-tareas" replace />
    : <Navigate to="/homeAdmin" replace />;
}
