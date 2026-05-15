import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProcesosFabricacion } from "../../api/ProcesoFabricacion";


export function useProcesoFabricacionDetalle() {
    const { modeloId } = useParams();

    const [modelo, setModelo] = useState(null);
    const [procesos, setProcesos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        if (!modeloId) {
            setLoading(false);
            return;
        }

        const obtenerProceso = async () => {
            try {
                setLoading(true);
                setGeneralError(null);

                const response = await ProcesosFabricacion.showByModelo(modeloId);

                setModelo(response.data);

                setProcesos(
                    response.data?.procesos_fabricacion || []
                );
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                        "Ocurrió un error al cargar el proceso."
                );
            } finally {
                setLoading(false);
            }
        };

        obtenerProceso();
    }, [modeloId]);

    return {
        modelo,
        procesos,
        loading,
        generalError,
        hasProcesos: procesos.length > 0,
    };
}