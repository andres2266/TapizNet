import { Link } from "react-router-dom";

export default function PuestoTrabajoForm({ register,handleSubmit,onSubmit,onCancel,errors,isSubmitting,generalError,successMessage,isEdit = false,}) {
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
                <div className="form-group form-full">
                    <label>Nombre del puesto</label>

                    <input
                        type="text"
                        placeholder="Ej: Tapicero"
                        disabled={isSubmitting}
                        {...register("nombre", {
                            minLength: {
                                value: 2,
                                message: "Debe tener al menos 2 caracteres.",
                            },
                            maxLength: {
                                value: 100,
                                message: "No puede superar los 100 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u,
                                message: "Solo puede contener letras y espacios.",
                            },
                        })}
                        className={errors.nombre ? "input-error" : ""}
                    />

                    <p className="form-error">
                        {errors.nombre?.message}
                    </p>
                </div>
            </div>

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
                            : "Crear puesto"}
                </button>

                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>

                <Link className="btn btn-secondary" to="/homeAdmin">
                    Volver
                </Link>
            </div>
        </form>
    );
}