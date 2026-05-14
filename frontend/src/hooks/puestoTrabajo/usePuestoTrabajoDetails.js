import { useEffect, useState } from "react";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

export function usePuestoTrabajoDetail(id) {

    const [puestoTrabajo, setPuestoTrabajo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!id) return;

        const obtenerPuestoTrabajo = async () => {

            try {

                setLoading(true);
                setError(null);

                const response = await PuestosTrabajo.show(id);

                setPuestoTrabajo(response.data);

            } catch (error) {

                console.error(error);

                if (error.response?.status === 404) {

                    setError("El puesto de trabajo no existe.");

                } else if (error.response?.status === 403) {

                    setError("No tienes permisos para ver este puesto de trabajo.");

                } else {

                    setError("Ocurrió un error al cargar el puesto de trabajo.");
                }

            } finally {

                setLoading(false);
            }
        };

        obtenerPuestoTrabajo();

    }, [id]);

    return {
        puestoTrabajo,
        loading,
        error,
    };
}