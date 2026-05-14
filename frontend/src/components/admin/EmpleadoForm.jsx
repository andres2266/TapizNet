import { Link } from "react-router-dom";
import Icons from '../../utils/icons.jsx'

export default function EmpleadoForm({
    mode = "create",
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    generalError,
    successMessage,
    onCancel,

    onDarBaja,
    onActivar,
    isUpdatingEstado = false,
}) {
    const isEdit = mode === "edit";

    return (
        <form className="card employee-form" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert />
                    {generalError}
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    <Icons.Check />
                    {successMessage}
                </div>
            )}

            <div className="form-grid">
                
                <div className="form-group">
                    <label><Icons.UserSingle /> Usuario</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("usuario", {
                            minLength: { value: 3, message: "Mínimo 3 caracteres." },
                            maxLength: { value: 30, message: "Máximo 30 caracteres." },
                            pattern: { value: /^[a-zA-Z0-9._-]+$/, message: "Solo letras, números y ._-" },
                        })}
                        className={errors.usuario ? "input-error" : ""}
                        placeholder="ej. juan.perez"
                    />
                    {errors.usuario && <p className="form-error"><Icons.Alert /> {errors.usuario.message}</p>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label><Icons.Email /> Email</label>
                    <input
                        type="email"
                        disabled={isSubmitting}
                        {...register("email", {
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido." },
                        })}
                        className={errors.email ? "input-error" : ""}
                        placeholder="ej. juan@tapiceria.com"
                    />
                    {errors.email && <p className="form-error"><Icons.Alert /> {errors.email.message}</p>}
                </div>

                {/* Contraseña */}
                <div className="form-group">
                    <label><Icons.Lock /> Contraseña</label>
                    <input
                        type="password"
                        disabled={isSubmitting}
                        {...register("password", {
                            minLength: { value: 6, message: "Mínimo 6 caracteres." },
                            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: "Debe tener letras y números." },
                        })}
                        className={errors.password ? "input-error" : ""}
                        placeholder="••••••"
                    />
                    {errors.password && <p className="form-error"><Icons.Alert /> {errors.password.message}</p>}
                </div>

                {/* Nombre */}
                <div className="form-group">
                    <label><Icons.UserSingle /> Nombre</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("nombre", {
                            minLength: { value: 2, message: "Mínimo 2 caracteres." },
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: "Solo letras." },
                        })}
                        className={errors.nombre ? "input-error" : ""}
                        placeholder="Juan"
                    />
                    {errors.nombre && <p className="form-error"><Icons.Alert /> {errors.nombre.message}</p>}
                </div>

                {/* Apellido */}
                <div className="form-group">
                    <label><Icons.UserSingle /> Apellido</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("apellido", {
                            minLength: { value: 2, message: "Mínimo 2 caracteres." },
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: "Solo letras." },
                        })}
                        className={errors.apellido ? "input-error" : ""}
                        placeholder="Pérez"
                    />
                    {errors.apellido && <p className="form-error"><Icons.Alert /> {errors.apellido.message}</p>}
                </div>

                {/* Teléfono */}
                <div className="form-group">
                    <label><Icons.Phone /> Teléfono</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("telefono", {
                            pattern: { value: /^[0-9+\s-]{7,20}$/, message: "Teléfono inválido." },
                        })}
                        className={errors.telefono ? "input-error" : ""}
                        placeholder="+34 123 456 789"
                    />
                    {errors.telefono && <p className="form-error"><Icons.Alert /> {errors.telefono.message}</p>}
                </div>

                {/* DNI */}
                <div className="form-group">
                    <label><Icons.Id /> DNI</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("dni", {
                            minLength: { value: 5, message: "Mínimo 5 caracteres." },
                            pattern: { value: /^[a-zA-Z0-9-]+$/, message: "Formato inválido." },
                        })}
                        className={errors.dni ? "input-error" : ""}
                        placeholder="12345678A"
                    />
                    {errors.dni && <p className="form-error"><Icons.Alert /> {errors.dni.message}</p>}
                </div>

                {/* Tipo contrato */}
                <div className="form-group">
                    <label><Icons.Contract /> Tipo contrato</label>
                    <select {...register("tipo_contrato")}>
                        <option value="">{isEdit ? "No cambiar" : "Selecciona"}</option>
                        <option value="horas">Horas</option>
                        <option value="destajo">Destajo</option>
                    </select>
                </div>

                {/* Precio hora */}
                <div className="form-group">
                    <label>
                        <Icons.Money size={14} style={{ width: 14, height: 14 }} />
                        Precio hora (€)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        {...register("precio_hora", {
                            min: { value: 0, message: "No puede ser negativo." },
                        })}
                        className={errors.precio_hora ? "input-error" : ""}
                        placeholder="0.00"
                    />
                    {errors.precio_hora && <p className="form-error"><Icons.Alert size={12} /> {errors.precio_hora.message}</p>}
                </div>

                {/* Saldo pendiente (solo edición) */}
                {isEdit && (
                    <div className="form-group">
                        <label><Icons.Money /> Saldo pendiente (€)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("saldo_pendiente", {
                                min: { value: 0, message: "No puede ser negativo." },
                            })}
                            placeholder="0.00"
                        />
                        {errors.saldo_pendiente && <p className="form-error"><Icons.Alert /> {errors.saldo_pendiente.message}</p>}
                    </div>
                )}

                {/* Rol */}
                <div className="form-group">
                    <label><Icons.Role /> Rol</label>
                    <select {...register("rol")}>
                        <option value="">{isEdit ? "No cambiar" : "Selecciona"}</option>
                        <option value="administrador">Administrador</option>
                        <option value="gestor">Gestor</option>
                        <option value="operario">Operario</option>
                    </select>
                </div>

                {/* Estado (solo edición) */}
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

            {/* Checkbox activo (solo creación) */}
            {!isEdit && (
                <label className="checkbox-card">
                    <input type="checkbox" disabled={isSubmitting} {...register("activo")} defaultChecked />
                    <span>
                        <strong><Icons.Check /> Empleado activo</strong>
                        <small>El trabajador podrá iniciar sesión y recibir tareas.</small>
                    </span>
                </label>
            )}

            {/* Botones */}
            <div className="page-actions">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting || isUpdatingEstado}>
                    <Icons.Save />
                    {isSubmitting ? (isEdit ? "Guardando..." : "Creando...") : (isEdit ? "Guardar cambios" : "Crear trabajador")}
                </button>

                {isEdit && onActivar && (
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={onActivar}
                        disabled={isSubmitting || isUpdatingEstado}
                    >
                        <Icons.Check />
                        {isUpdatingEstado ? "Procesando..." : "Activar"}
                    </button>
                )}

                {isEdit && onDarBaja && (
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={onDarBaja}
                        disabled={isSubmitting || isUpdatingEstado}
                    >
                        <Icons.Close />
                        {isUpdatingEstado ? "Procesando..." : "Dar de baja"}
                    </button>
                )}

                <button className="btn btn-secondary" type="button" onClick={onCancel} disabled={isSubmitting || isUpdatingEstado}>
                    <Icons.Close />
                    Cancelar
                </button>

                <Link className="btn btn-secondary" to="/homeAdmin">
                    <Icons.ArrowRight />
                    Volver
                </Link>
            </div>
        </form>
    );
}