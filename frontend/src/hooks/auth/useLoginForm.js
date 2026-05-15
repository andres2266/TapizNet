// src/hooks/auth/useLoginForm.js

import { useState } from "react";
import { useForm } from "react-hook-form";
import { authStore } from "../../stores/auth";
import { Auth } from "../../api/Auth";
import { useNavigate } from "react-router-dom";

export function useLoginForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const { login } = authStore();

    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const loginTrabajador = async (data) => {
        try {
            setGeneralError("");
            setSuccessMessage("");

            const response = await Auth.login(data);

            login(response.empleado, response.token);

            setSuccessMessage(response.message || "Inicio de sesión correcto");

            navigate("/");
        } catch (error) {
            if (error.response?.status === 422) {
                const errores = error.response.data.errors;

                Object.keys(errores).forEach((campo) => {
                    setError(campo, {
                        type: "server",
                        message: errores[campo][0],
                    });
                });

                return;
            }

            setGeneralError(
                error.response?.data?.message ||
                    "No se pudo iniciar sesión. Revisa tus datos."
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
        loginTrabajador,
    };
}