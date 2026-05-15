import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ProcesosFabricacion } from "../../api/ProcesoFabricacion";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

const defaultValues = {
    fases: [],
};

export function useEditarProcesoFabricacionForm(modeloId) {
    const valoresInicialesRef = useRef(null);

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
    const [loading, setLoading] = useState(true);
    const [loadingPuestos, setLoadingPuestos] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);

 const formatearProcesoParaFormulario = (modelo) => {
    const procesos = modelo?.procesos_fabricacion || [];

    return {
        fases: procesos.map((fase, index) => ({
            id: fase.id,
            puesto_trabajo_id: fase.puesto_trabajo_id ?? "",
            orden: fase.orden ?? index + 1,
            nombre_tarea: fase.nombre_tarea ?? "",
            descripcion: fase.descripcion ?? "",
            tiempo_estimado_minutos: fase.tiempo_estimado_minutos ?? "",
            precio_destajo: fase.precio_destajo ?? "",
            parametros: (fase.parametros_fabricacion || []).map((parametro) => ({
                id: parametro.id,
                nombre:
                    parametro.nombre ??
                    parametro.nombre_parametro ??
                    "",
                valor:
                    parametro.valor ??
                    parametro.valor_defecto ??
                    "",
            })),
        })),
    };
};

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                setLoadingPuestos(true);
                setGeneralError(null);

                const [procesoResponse, puestosResponse] = await Promise.all([
                    ProcesosFabricacion.showByModelo(modeloId),
                    PuestosTrabajo.view(),
                ]);

                const formData = formatearProcesoParaFormulario(
                    procesoResponse.data
                );

                valoresInicialesRef.current = formData;

                reset(formData);

                setPuestosTrabajo(puestosResponse.data.data || []);
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                    "No se pudo cargar el proceso de fabricación."
                );
            } finally {
                setLoading(false);
                setLoadingPuestos(false);
            }
        };

        if (modeloId) {
            cargarDatos();
        }
    }, [modeloId, reset]);

    const agregarFase = () => {
        setGeneralError(null);

        appendFase({
            puesto_trabajo_id: "",
            orden: fases.length + 1,
            nombre_tarea: "",
            descripcion: "",
            tiempo_estimado_minutos: "",
            precio_destajo: "",
            parametros: [],
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

    const normalizarValor = (valor) => {
        if (valor === null || valor === undefined) return "";
        return String(valor);
    };


    const facesModificados = (a, b) =>
        Object.fromEntries(
            Object.entries(a).filter(
                ([clave, valor]) => String(valor ?? "") !== String(b?.[clave] ?? "")
            )
        );


    const diffParametros = (actuales = [], iniciales = []) =>
        actuales
            .map((parametro, i) => {
                const cambios = facesModificados(parametro, iniciales?.[i] || {});
                return Object.keys(cambios).length
                    ? { id: parametro.id, ...cambios }
                    : null;
            })
            .filter(Boolean);

    // 🔹 Método principal: genera el payload solo con los cambios
   const crearPayloadSoloConCambios = (data) => {
    const iniciales = valoresInicialesRef.current;
    if (!iniciales) return { fases: [] };

    const fases = data.fases.map((fase, i) => {
        const faseInicial = iniciales.fases[i];

        // 🔹 1. FASE NUEVA
        if (!fase.id) {
            return {
                ...fase,
                nueva: true,
            };
        }

        // 2. FASE EXISTENTE
        const cambiosFase = facesModificados(fase, faseInicial);

        //  3. PARÁMETROS
        const parametros = fase.parametros.map((param, j) => {
            const inicial = faseInicial.parametros[j];

            // Parámetro nuevo
            if (!param.id) {
                return { ...param, nuevo: true };
            }

            // Parámetro existente
            const cambios = facesModificados(param, inicial);
            return Object.keys(cambios).length
                ? { id: param.id, ...cambios }
                : null;
        }).filter(Boolean);

        if (parametros.length) {
            cambiosFase.parametros = parametros;
        }

        return Object.keys(cambiosFase).length
            ? { id: fase.id, ...cambiosFase }
            : null;
    }).filter(Boolean);

    return { fases };
};


    const actualizarProcesoFabricacion = async (data) => {
        try {
            setSuccessMessage(null);
            setGeneralError(null);

            const payload = crearPayloadSoloConCambios(data);

            if (payload.fases.length === 0) {
                setGeneralError("No has realizado ningún cambio.");
                return false;
            }

            const response = await ProcesosFabricacion.updateByModelo(
                modeloId,
                payload
            );

            setSuccessMessage(
                response.message ||
                "Proceso de fabricación actualizado correctamente."
            );

            valoresInicialesRef.current = data;

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
                    "Ocurrió un error al actualizar el proceso de fabricación."
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
        loading,
        loadingPuestos,

        actualizarProcesoFabricacion,

        successMessage,
        generalError,
    };
}
