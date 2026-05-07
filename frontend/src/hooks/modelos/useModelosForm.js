import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modelos } from "../../api/Modelos";

export function useModeloForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError, } = useForm()

    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    const crearModelo = async (data) => {
        try {
            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== "")
            );

            const response = await Modelos.create(cleanData);

            setSuccessMessage(response.message || "Modelo creado correctamente.");

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
                    "Ocurrió un error al crear el modelo."
                );
            }

            throw error;
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        crearModelo,
        successMessage,
        generalError,
    };

}