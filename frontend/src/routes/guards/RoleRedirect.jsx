import { Navigate, Outlet } from "react-router-dom";
import { authStore } from '../../stores/auth';

export function RoleRedirect({ allowedRoles }) {
 const empleado = authStore((state) => state.empleado);
    if (!empleado) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(empleado.rol)) {
        if (empleado.rol === "operario") {
            return <Navigate to="/homeOperario" replace />;
        }

        if (empleado.rol === "gestor") {
            return <Navigate to="/homeGestor" replace />;
        }

        return <Navigate to="/homeAdmin" replace />;
    }

    return <Outlet />;
  }