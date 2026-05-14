import { useState } from "react";
import { useForm } from "react-hook-form";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

export function usePuestoTrabajoUpdateForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const [generalError, setGeneralError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const actualizarPuestoTrabajo = async (id, data) => {
        try {
            setGeneralError(null);
            setSuccessMessage(null);

            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => {
                    return value !== "" && value !== null && value !== undefined;
                })
            );
            console.log(cleanData)
            const response = await PuestosTrabajo.update(id, cleanData);

            setSuccessMessage(
                response.data.message ||
                "Puesto de trabajo actualizado correctamente."
            );

            reset();

        } catch (error) {
            console.error("Error actualizando puesto de trabajo:", error);

            if (error.response?.status === 422) {
                const backendErrors = error.response.data.errors;

                Object.keys(backendErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: backendErrors[field][0],
                    });
                });

                return;
            }

            setGeneralError(
                error.response?.data?.message ||
                "No se pudo actualizar el puesto de trabajo."
            );
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
        successMessage,
        actualizarPuestoTrabajo,
    };
}