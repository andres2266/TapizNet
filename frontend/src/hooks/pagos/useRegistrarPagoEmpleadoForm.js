import { useState } from "react";
import { useForm } from "react-hook-form";
import { PagosEmpleados } from "../../api/PagosEmpleados";

export function useRegistrarPagoEmpleadoForm(empleadoId) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm({
        defaultValues: {
            metodo_pago: "efectivo",
            referencia_pago: "",
            fecha_pago: "",
            notas: "",
        },
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const [pagoRegistrado, setPagoRegistrado] = useState(null);

    const registrarPago = async (data) => {
        try {
            setSuccessMessage(null);
            setGeneralError(null);
            setPagoRegistrado(null);

            const cleanData = Object.fromEntries(
                Object.entries(data).filter(
                    ([_, value]) =>
                        value !== "" &&
                        value !== null &&
                        value !== undefined
                )
            );

            const response = await PagosEmpleados.registrar(
                empleadoId,
                cleanData
            );

            setSuccessMessage(
                response?.message || "Pago registrado correctamente."
            );

            setPagoRegistrado(response.data || null);

            reset({
                metodo_pago: "efectivo",
                referencia_pago: "",
                fecha_pago: "",
                notas: "",
            });

            return response;
        } catch (error) {
            console.log(error);

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
                error.response?.data?.message ||
                    "No se pudo registrar el pago del empleado."
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
        pagoRegistrado,

        registrarPago,
    };
}