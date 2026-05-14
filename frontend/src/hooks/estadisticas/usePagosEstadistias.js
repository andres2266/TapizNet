import { useEffect, useState } from "react";
import { Estadisticas } from "../../api/Estadisticas";

export function usePagosEstadisticas() {
    const [estadisticas, setEstadisticas] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const obtenerEstadisticas = async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await Estadisticas.getPuestosStats();

            setEstadisticas(response.data);
        } catch (error) {
            console.error(error);

            setError(
                error.message?.data?.response ||
                "No se pudieron obtener las estadísticas."
            );
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
        recargarEstadisticas: obtenerEstadisticas,
    };
}