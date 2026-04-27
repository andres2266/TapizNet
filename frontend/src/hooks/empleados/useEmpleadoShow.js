import { useEffect, useState } from "react";
import { Empleados } from "../../api/Empleados";
export const useEmpleadoShow = (id) => {
    const [empleado, setEmpleado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const obtenerEmpleado = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await Empleados.show(id);
                setEmpleado(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Error al cargar empleado"
                );
            } finally {
                setLoading(false);
            }
        };

        obtenerEmpleado();
    }, [id]); // 🔥 importante

    return { empleado, loading, error };
};