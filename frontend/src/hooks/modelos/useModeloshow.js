import { useEffect, useState } from "react";
import { Modelos } from "../../api/Modelos";


export function useModeloShow(id) {
    const [modelo, setModelo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const cargarModelo = async () => {
            try {
                setLoading(true);
                setGeneralError(null);

                const response = await Modelos.show(id);
                console.log(response);
                const data = response.modelo
 


                setModelo(data);
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                        "No se pudo cargar la información del modelo."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarModelo();
        }
    }, [id]);

    return {
        modelo,
        loading,
        generalError,
    };
}