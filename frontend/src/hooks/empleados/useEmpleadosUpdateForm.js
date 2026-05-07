import { useForm } from "react-hook-form";
import { Empleados } from "../../api/Empleados";
import { useState } from "react";

export function useEmpleadoUpdateForm() {
    const { register,handleSubmit,formState: { errors, isSubmitting },reset,setError,} = useForm();
    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    const actualizarEmpleado = async (id, data) => {
        try {
            
            setSuccessMessage(null);
            setGeneralError(null);

            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== "")
            );

            const response = await Empleados.update(id, cleanData);

        
            setSuccessMessage(response.message || "Empleado actualizado correctamente.");

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
                // error general (no validación)
                setGeneralError(
                    error.response?.data?.message ||
                    "Ocurrió un error al actualizar el empleado."
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
        actualizarEmpleado,
        successMessage,
        generalError,
    };
}