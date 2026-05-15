import { useEffect, useState } from "react";
import { Modelos } from "../../api/Modelos";

export function useModeloEstadisticas() {
    const [estadisticas, setEstadisticas] = useState({
        modelos_activos: 0,
        modelos_sin_proceso: 0,
        modelos_listos_produccion: 0,
    });

    const [loading, setLoading] = useState(true);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        obtenerEstadisticas();
    }, []);

    const obtenerEstadisticas = async () => {
        try {
            setLoading(true);
            setGeneralError(null);

            const response = await Modelos.statistics();
            console.log(response)
            setEstadisticas({
                modelos_activos: response.data?.modelos_activos ?? 0,
                modelos_sin_proceso: response.data?.modelos_sin_proceso ?? 0,
                modelos_listos_produccion:response.data?.modelos_listos_produccion ?? 0,
            });
        } catch (error) {
            console.error(error);

            setGeneralError(
                error.response?.data?.message ||
                    "No se pudieron cargar las estadísticas de modelos."
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        estadisticas,
        loading,
        generalError,
        obtenerEstadisticas,
    };
}