import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TareasProduccion } from "../../api/TareasProduccion";

export function useTareaInstrucciones() {
    const { tareaId } = useParams();

    const [tarea, setTarea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const cargarInstrucciones = async () => {
            try {
                setLoading(true);
                setGeneralError(null);

                const data = await TareasProduccion.verInstrucciones(tareaId);
                console.log(data)
                setTarea(data.tarea);
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                    "No se pudieron cargar las instrucciones de la tarea."
                );
            } finally {
                setLoading(false);
            }
        };

        cargarInstrucciones();
    }, [tareaId]);

    const parametros = tarea?.proceso_fabricacion?.parametros_fabricacion || [];

    return {
        tarea,
        parametros,
        loading,
        generalError,
        hasParametros: parametros.length > 0,
    };
}