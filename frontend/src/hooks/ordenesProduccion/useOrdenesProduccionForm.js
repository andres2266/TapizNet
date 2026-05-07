import { useState } from "react";
import { useForm } from "react-hook-form";
import { OrdenesProduccion } from "../../api/OrdenesProduccion";

export function useOrdenesProduccionForm(modeloId){
  const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm()

     const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const [ordenCreada, setOrdenCreada] = useState(null);

    const crearOrdenProduccion = async (data) => {

        try {
            setSuccessMessage(null);
            setGeneralError(null);
            setOrdenCreada(null);
            
            const cleanData = Object.fromEntries(
                Object.entries({
                    ...data,
                    modelo_id: Number(modeloId),
                    cantidad: Number(data.cantidad),
                }).filter(
                    ([_, value]) =>
                        value !== "" &&
                        value !== null &&
                        value !== undefined
                )
            );
            
            const response = await OrdenesProduccion.create(cleanData);

            setSuccessMessage(
                response?.message || "Orden de producción creada correctamente."
            );

            setOrdenCreada(response.data || null);

            reset({
                cantidad: "",
                prioridad: "normal",
                fecha_entrega_estimada: "",
                notas: "",
            });

            return response;
        } catch (error) {
            

            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;

                Object.keys(validationErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: validationErrors[field][0],
                    });
                });

                setGeneralError("Revisa los campos del formulario.");
                return;
            }

            setGeneralError(
                console.log(error),
                error.response?.data?.message ||
                    "No se pudo crear la orden de producción."
            );
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        successMessage,
        generalError,
        ordenCreada,
        crearOrdenProduccion,
    };
}