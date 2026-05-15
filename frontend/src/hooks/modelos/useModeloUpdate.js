import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modelos } from "../../api/Modelos";


export function useModeloUpdateForm(id) {
    
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    
    const [modelo, setModelo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generalError, setGeneralError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const cargarModelo = async () => {
            try {
                setLoading(true);
                setGeneralError(null);
     
                const response = await Modelos.show(id);
                
                const data = response.modelo 

                setModelo(data);

                reset({
                    nombre: data.nombre || "",
                    descripcion: data.descripcion || "",
                    activo: data.activo ?? true,
                });
            } catch (error) {
                setGeneralError(
                    error.response?.data?.message ||
                        "No se pudo cargar el modelo."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarModelo();
        }
    }, [id, reset]);

    const onSubmit = async (formData) => {
        try {
            setGeneralError(null);
            setSuccessMessage(null);

            const cleanData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => {
                    return value !== "" && value !== null && value !== undefined;
                })
            );
            
            const response = await Modelos.update(id, cleanData);
            console.log(response)
            setModelo(response.modelo);

            setSuccessMessage(
                response.message || "Modelo actualizado correctamente."
            );
        } catch (error) {
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors;

                Object.keys(validationErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: validationErrors[field][0],
                    });
                });

                return;
            }

            setGeneralError(
                console.log(error),
                error.response?.data?.message ||
                    "No se pudo actualizar el modelo."
            );
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        modelo,
        loading,
        generalError,
        successMessage,
        onSubmit,
    };
}