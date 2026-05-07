import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../stores/auth";

export function PublicGuard() {
    const empleado = authStore((state) => state.empleado);

    if (!empleado) return <Outlet />;

    if (empleado.rol === "operario") {
        return <Navigate to="/homeOperario" replace />;
    }

    if (empleado.rol === "gestor") {
        return <Navigate to="/homeGestor" replace />;
    }

    return <Navigate to="/homeAdmin" replace />;
}
