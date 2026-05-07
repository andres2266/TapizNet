import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ProcesosFabricacion } from "../../api/ProcesoFabricacion";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";
import { data, useParams } from "react-router-dom";

const defaultValues = {
    fases: [
        {
            puesto_trabajo_id: "",
            orden: 1,
            nombre_tarea: "",
            descripcion: "",
            tiempo_estimado_minutos: "",
            precio_destajo: "",
            parametros: [
                {
                    nombre: "",
                    valor: "",
                },
            ],
        },
    ],
};

export function useProcesoFabricacionForm() {
    const { modeloId } = useParams();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        defaultValues,
    });

    const {
        fields: fases,
        append: appendFase,
        remove: removeFase,
    } = useFieldArray({
        control,
        name: "fases",
    });

    const [puestosTrabajo, setPuestosTrabajo] = useState([]);
    const [loadingPuestos, setLoadingPuestos] = useState(true); 
    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const cargarPuestosTrabajo = async () => {
            try {
                setLoadingPuestos(true);
                setGeneralError(null);

                const response = await PuestosTrabajo.view();
            
            console.log(response.data.data)
                setPuestosTrabajo(response.data.data || []);
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                        "No se pudieron cargar los puestos de trabajo."
                );
            } finally {
                setLoadingPuestos(false);
            }
        };

        cargarPuestosTrabajo();
    }, []);

    const agregarFase = () => {
        setGeneralError(null);

        appendFase({
            puesto_trabajo_id: "",
            orden: fases.length + 1,
            nombre_tarea: "",
            descripcion: "",
            tiempo_estimado_minutos: "",
            precio_destajo: "",
            parametros: [
                {
                    nombre: "",
                    valor: "",
                },
            ],
        });
    };

    const eliminarFase = (index) => {
        setGeneralError(null);

        if (fases.length === 1) {
            setGeneralError("El proceso debe tener al menos una fase.");
            return;
        }

        removeFase(index);
    };

    const limpiarDatos = (data) => {
        return {
            fases: data.fases.map((fase, index) => ({
                puesto_trabajo_id: Number(fase.puesto_trabajo_id),
                orden: Number(fase.orden || index + 1),
                nombre_tarea: fase.nombre_tarea.trim(),
                descripcion: fase.descripcion?.trim() || null,
                tiempo_estimado_minutos: Number(fase.tiempo_estimado_minutos),
                precio_destajo: Number(fase.precio_destajo),
                parametros: (fase.parametros || [])
                    .filter((parametro) => parametro.nombre || parametro.valor)
                    .map((parametro) => ({
                        nombre: parametro.nombre?.trim() || "",
                        valor: parametro.valor?.trim() || "",
                    })),
            })),
        };
    };

    const crearProcesoFabricacion = async (data) => {
        try {
            setSuccessMessage(null);
            setGeneralError(null);

            const cleanData = limpiarDatos(data);

            const response = await ProcesosFabricacion.createByModelo(
                modeloId,
                cleanData
            );

            setSuccessMessage(
                response.message || "Proceso de fabricación creado correctamente."
            );

            reset(defaultValues);

            return true;
        } catch (error) {
            const backendErrors = error.response?.data?.errors;

            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: messages[0],
                    });
                });
            } else {
                setGeneralError(
                    error.response?.data?.message ||
                        "Ocurrió un error al crear el proceso de fabricación."
                );
            }

            return false;
        }
    };

    return {
        register,
        handleSubmit,
        control,
        errors,
        isSubmitting,

        fases,
        agregarFase,
        eliminarFase,

        puestosTrabajo,
        loadingPuestos,

        crearProcesoFabricacion,

        successMessage,
        generalError,
    };
}