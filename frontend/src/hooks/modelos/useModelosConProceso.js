import { useEffect, useState } from "react";
import { Modelos } from "../../api/Modelos";

export function useModelosConProceso() {
    const [modelos, setModelos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchModelosConProceso = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await Modelos.view({
                estado_proceso: "configurado",
            });

            setModelos(response.data?.data || response.data || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "No se pudieron cargar los modelos con proceso de fabricación."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModelosConProceso();
    }, []);

    return {
        modelos,
        loading,
        error,
        fetchModelosConProceso,
    };
}