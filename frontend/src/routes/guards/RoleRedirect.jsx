import { Navigate } from "react-router-dom";
import { authStore } from '../../stores/auth';

export function RoleRedirect() {
  const empleado = authStore((state) => state.empleado);
  if (!empleado) return null;
  return empleado.rol === "operario"
    ? <Navigate to="/mis-tareas" replace />
    : <Navigate to="/homeAdmin" replace />;
}
