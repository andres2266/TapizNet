import { useState } from "react";
import { useForm } from "react-hook-form";
import { Empleados } from "../../api/Empleados";

export function useEmpleadoForm() {
    const { register,handleSubmit,formState: { errors, isSubmitting },reset,setError,} = useForm();

    const [successMessage, setSuccessMessage] = useState("");
    const [generalError, setGeneralError] = useState("");

    const crearTrabajador = async (data) => {
        setSuccessMessage("");
        setGeneralError("");

        try {
            const user = await Empleados.register(data);

            setSuccessMessage("Empleado creado correctamente.");
            reset();

            return user;

        } catch (error) {
            console.log(error);

            const response = error.response;

            if (response?.status === 422 && response.data?.errors) {
                Object.entries(response.data.errors).forEach(([field, messages]) => {
                    setError(field, {
                        type: "server",
                        message: messages[0],
                    });
                });
                setGeneralError("Revisa los campos del formulario.");
                return;
            }

            setGeneralError(
                response?.data?.message || "No se pudo crear el empleado. Inténtalo de nuevo."
            );
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        crearTrabajador,
        successMessage,
        generalError,
    };
}