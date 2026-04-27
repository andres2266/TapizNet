import { useForm } from "react-hook-form";
import { Empleados } from "../../api/Empleados";


export function useEmpleadoUpdateForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm();

    const actualizarEmpleado = async (id, data) => {
        try {
            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== "")
            );

            const response = await Empleados.update(id, cleanData);

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
    };
}