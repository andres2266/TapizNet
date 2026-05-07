
import { Link } from "react-router-dom";

export default function EmpleadoForm({ mode = "create", register, handleSubmit, errors, isSubmitting, onSubmit, generalError, successMessage, onCancel,
}) {
    const isEdit = mode === "edit";

    return (
        <form className="card employee-form" onSubmit={handleSubmit(onSubmit)}>


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

            <div className="form-grid">


                <div className="form-group">
                    <label>Usuario</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("usuario", {
                            minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres.",
                            },
                            maxLength: {
                                value: 30,
                                message: "Máximo 30 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+$/,
                                message: "Solo letras, números y ._-",
                            },
                        })}
                        className={errors.usuario ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.usuario?.message}</p>
                </div>


                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        disabled={isSubmitting}
                        {...register("email", {
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email inválido.",
                            },
                        })}
                        className={errors.email ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.email?.message}</p>
                </div>


                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        disabled={isSubmitting}
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message: "Mínimo 6 caracteres.",
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                                message: "Debe tener letras y números.",
                            },
                        })}
                        className={errors.password ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.password?.message}</p>
                </div>


                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("nombre", {
                            minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                message: "Solo letras.",
                            },
                        })}
                        className={errors.nombre ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.nombre?.message}</p>
                </div>


                <div className="form-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("apellido", {
                            minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                message: "Solo letras.",
                            },
                        })}
                        className={errors.apellido ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.apellido?.message}</p>
                </div>

                {/* TELÉFONO */}
                <div className="form-group">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("telefono", {
                            pattern: {
                                value: /^[0-9+\s-]{7,20}$/,
                                message: "Teléfono inválido.",
                            },
                        })}
                        className={errors.telefono ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.telefono?.message}</p>
                </div>


                <div className="form-group">
                    <label>DNI</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("dni", {
                            minLength: {
                                value: 5,
                                message: "Mínimo 5 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9-]+$/,
                                message: "Formato inválido.",
                            },
                        })}
                        className={errors.dni ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.dni?.message}</p>
                </div>


                <div className="form-group">
                    <label>Tipo contrato</label>
                    <select {...register("tipo_contrato")}>
                        <option value="">
                            {isEdit ? "No cambiar" : "Selecciona"}
                        </option>
                        <option value="horas">Horas</option>
                        <option value="destajo">Destajo</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Precio hora</label>
                    <input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        {...register("precio_hora", {
                            min: {
                                value: 0,
                                message: "No puede ser negativo.",
                            },
                        })}
                        className={errors.precio_hora ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.precio_hora?.message}</p>
                </div>


                {isEdit && (
                    <div className="form-group">
                        <label>Saldo pendiente</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("saldo_pendiente", {
                                min: {
                                    value: 0,
                                    message: "No puede ser negativo.",
                                },
                            })}
                        />
                        <p className="form-error">{errors.saldo_pendiente?.message}</p>
                    </div>
                )}


                <div className="form-group">
                    <label>Rol</label>
                    <select {...register("rol")}>
                        <option value="">
                            {isEdit ? "No cambiar" : "Selecciona"}
                        </option>
                        <option value="administrador">Administrador</option>
                        <option value="gestor">Gestor</option>
                        <option value="operario">Operario</option>
                    </select>
                </div>


                {isEdit && (
                    <div className="form-group">
                        <label>Estado</label>
                        <select {...register("activo")}>
                            <option value="">No cambiar</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                )}

            </div>

            {!isEdit && (
                <label className="checkbox-card">
                    <input
                        type="checkbox"
                        disabled={isSubmitting}
                        {...register("activo")}
                        defaultChecked
                    />
                    <span>
                        <strong>Empleado activo</strong>
                        <small>El trabajador podrá iniciar sesión y recibir tareas.</small>
                    </span>
                </label>
            )}

            <div className="page-actions">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? isEdit
                            ? "Guardando..."
                            : "Creando..."
                        : isEdit
                            ? "Guardar cambios"
                            : "Crear trabajador"}
                </button>

                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>

                <Link className="btn btn-secondary" to="/empleado/view">
                    Volver
                </Link>
            </div>
        </form>
    );
}
