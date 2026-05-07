import { useState } from "react";
import { useForm } from "react-hook-form";
import { PuestosTrabajo } from "../../api/PuestosTrabajo";

export function usePuestoTrabajoForm() {
    const {register,handleSubmit,reset,setError,formState: { errors, isSubmitting },} = useForm();

    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    const crearPuestoTrabajo = async (data) => {
        try {
            setSuccessMessage(null);
            setGeneralError(null);

            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== "")
            );

            const response = await PuestosTrabajo.create(cleanData);

            setSuccessMessage(response.message || "Puesto creado correctamente.");
            reset();

            return response;
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
                    "Ocurrió un error al crear el puesto de trabajo."
                );
            }

            throw error;
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        successMessage,
        generalError,
        crearPuestoTrabajo,
    };
}