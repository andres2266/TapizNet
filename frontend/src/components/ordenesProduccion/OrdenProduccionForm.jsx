
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../../utils/icons.jsx'
export function OrdenProduccionForm({register,handleSubmit,errors,isSubmitting,onSubmit,onCancel,successMessage,generalError,ordenCreada,}) 
{
    const navigate = useNavigate();
    return (
        <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
                <div className="form-alert form-alert-error">
                    {generalError}
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    {successMessage}
                </div>
            )}

            {ordenCreada && (
                <div className="form-alert form-alert-success">
                    Orden generada: {ordenCreada.codigo || ordenCreada.id}
                </div>
            )}

            <div className="form-grid">
                <div className="form-group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        min="1"
                        className={errors.cantidad ? "input-error" : ""}
                        {...register("cantidad", {
                            required: "La cantidad es obligatoria.",
                            min: {
                                value: 1,
                                message: "La cantidad debe ser mínimo 1.",
                            },
                        })}
                    />

                    {errors.cantidad && (
                        <p className="form-error">
                            {errors.cantidad.message}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>Prioridad</label>
                    <select
                        className={errors.prioridad ? "input-error" : ""}
                        {...register("prioridad", {
                            required: "La prioridad es obligatoria.",
                        })}
                    >
                        <option value="baja">Baja</option>
                        <option value="normal">Normal</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                    </select>

                    {errors.prioridad && (
                        <p className="form-error">
                            {errors.prioridad.message}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>Fecha de entrega estimada</label>
                    <input
                        type="date"
                        className={
                            errors.fecha_entrega_estimada ? "input-error" : ""
                        }
                        {...register("fecha_entrega_estimada")}
                    />

                    {errors.fecha_entrega_estimada && (
                        <p className="form-error">
                            {errors.fecha_entrega_estimada.message}
                        </p>
                    )}
                </div>

                <div className="form-group form-full">
                    <label>Notas</label>
                    <textarea
                        rows="4"
                        className={errors.notas ? "input-error" : ""}
                        placeholder="Ejemplo: sofá urgente, tela azul, entregar esta semana..."
                        {...register("notas", {
                            maxLength: {
                                value: 1000,
                                message:
                                    "Las notas no pueden superar los 1000 caracteres.",
                            },
                        })}
                    />

                    {errors.notas && (
                        <p className="form-error">
                            {errors.notas.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="page-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                    Volver
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Generando..." : "Crear orden"}
                </button>
            </div>
        </form>
    );
}
