// src/components/pagos/RegistrarPagoEmpleadoForm.jsx

export function RegistrarPagoEmpleadoForm({
    register,
    handleSubmit,
    errors,
    isSubmitting,
    generalError,
    successMessage,
    onSubmit,
    onCancel,
}) {
    return (
        <form
            className="employee-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            {generalError && (
                <p className="form-alert form-alert-error">
                    {generalError}
                </p>
            )}
            {successMessage && (
                <p className="form-alert form-alert-success">
                    {successMessage}
                </p>
            )}

            <div className="form-grid">
                <div className="form-group">
                    <label>Método de pago</label>

                    <select
                        className={errors.metodo_pago ? "input-error" : ""}
                        {...register("metodo_pago", {
                            required: "El método de pago es obligatorio.",
                        })}
                    >
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="cheque">Cheque</option>
                        <option value="otro">Otro</option>
                    </select>

                    {errors.metodo_pago && (
                        <span className="form-error">
                            {errors.metodo_pago.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>Fecha de pago</label>

                    <input
                        type="date"
                        className={errors.fecha_pago ? "input-error" : ""}
                        {...register("fecha_pago")}
                    />

                    {errors.fecha_pago && (
                        <span className="form-error">
                            {errors.fecha_pago.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label>Referencia de pago</label>
                    <input
                        type="text"
                        placeholder="Ej: TRX-2026-001"
                        className={
                            errors.referencia_pago ? "input-error" : ""
                        }
                        {...register("referencia_pago", {
                            maxLength: {
                                value: 120,
                                message:
                                    "La referencia no puede superar los 120 caracteres.",
                            },
                        })}
                    />
                    {errors.referencia_pago && (
                        <span className="form-error">
                            {errors.referencia_pago.message}
                        </span>
                    )}
                </div>
                <div className="form-group form-full">
                    <label>Notas</label>

                    <textarea
                        rows="4"
                        placeholder="Ej: Pago semanal realizado al tapicero."
                        className={errors.notas ? "input-error" : ""}
                        {...register("notas", {
                            maxLength: {
                                value: 1000,
                                message:
                                    "Las notas no pueden superar los 1000 caracteres.",
                            },
                        })}
                    />
                    {errors.notas && (
                        <span className="form-error">
                            {errors.notas.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="page-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registrando..." : "Registrar pago"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}