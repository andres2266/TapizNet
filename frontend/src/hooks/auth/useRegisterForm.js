import { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "../../api/Auth";
import { authStore } from "../../stores/auth";
import { useNavigate } from "react-router-dom";

export function useRegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const { login } = authStore();
    const navigate = useNavigate();

    const [generalError, setGeneralError] = useState("");

    const registerAdministrador = async (data) => {
        try {
            setGeneralError("");

            const response = await Auth.register(data);

            login(response.administrador, response.token);

            navigate("/home");
        } catch (error) {
            console.log(error)
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
                error.response?.data?.message ||
                    "No se pudo completar el registro."
            );
        }
    };

    return {
        register,
        handleSubmit,
        watch,
        errors,
        isSubmitting,
        generalError,
        registerAdministrador,
    };
}