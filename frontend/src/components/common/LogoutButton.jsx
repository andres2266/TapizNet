import { useNavigate } from "react-router-dom";
import { authStore } from "../../stores/auth";

export default function LogoutButton() {
    const navigate = useNavigate();

    const logout = authStore((state) => state.logout);

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    return (
        <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
        >
            Cerrar sesión
        </button>
    );
}