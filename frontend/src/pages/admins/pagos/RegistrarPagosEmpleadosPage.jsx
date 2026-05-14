// src/pages/admins/pagos/RegistrarPagoEmpleadoPage.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useRegistrarPagoEmpleadoForm } from "../../../hooks/pagos/useRegistrarPagoEmpleadoForm";
import { RegistrarPagoEmpleadoForm } from "../../../components/Pagos/RegistrarPagosEmpleadosForm";


export function RegistrarPagoEmpleadoPage() {
    const { empleadoId } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        successMessage,
        generalError,
        pagoRegistrado,
        registrarPago,
    } = useRegistrarPagoEmpleadoForm(empleadoId);

    const handleCancel = () => {
        navigate("/empleados/pagos-empleados");
    };

    const handleSubmitPago = async (data) => {
        const response = await registrarPago(data);

        if (response) {
            setTimeout(() => {
                navigate("/empleados/pagos-empleados");
            }, 800);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Registrar pago</h1>
                    <p>
                        Registra el pago realizado al empleado y liquida su
                        saldo pendiente.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                >
                    Volver
                </button>
            </div>

            <div className="card">
                <RegistrarPagoEmpleadoForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    generalError={generalError}
                    successMessage={successMessage}
                    onSubmit={handleSubmitPago}
                    onCancel={handleCancel}
                />
            </div>

            {pagoRegistrado && (
                <div className="card">
                    <h3>Resumen del pago</h3>

                    <p>
                        <strong>Monto pagado:</strong>{" "}
                        {Number(
                            pagoRegistrado.pago?.monto_pagado || 0
                        ).toFixed(2)}{" "}
                        €
                    </p>

                    <p>
                        <strong>Saldo anterior:</strong>{" "}
                        {Number(
                            pagoRegistrado.pago?.saldo_anterior || 0
                        ).toFixed(2)}{" "}
                        €
                    </p>

                    <p>
                        <strong>Saldo restante:</strong>{" "}
                        {Number(
                            pagoRegistrado.pago?.saldo_restante || 0
                        ).toFixed(2)}{" "}
                        €
                    </p>
                </div>
            )}
        </div>
    );
}