import { useEffect, useState } from "react";
import { Estadisticas } from "../../api/Estadisticas";


export function useTareasEstadisticas() {
    const [estadisticas, setEstadisticas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerEstadisticas = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await Estadisticas.obtenerEstadisticasTareas();

            setEstadisticas(response.data);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "No se pudieron cargar las estadísticas de tareas.";

            setError(message);
            setEstadisticas(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerEstadisticas();
    }, []);

    return {
        estadisticas,
        loading,
        error,
        obtenerEstadisticas,
    };
}