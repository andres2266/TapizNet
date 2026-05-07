import React from 'react'
import { Link } from "react-router-dom";

    export default function ModeloForm({register,handleSubmit,onSubmit,onCancel,errors,isSubmitting,generalError,successMessage,isEdit = false,}) {
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
                    <label>Nombre del modelo</label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        {...register("nombre", {
                            minLength: {
                                value: 2,
                                message: "Mínimo 2 caracteres.",
                            },
                            maxLength: {
                                value: 120,
                                message: "Máximo 120 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s._-]+$/,
                                message: "Solo letras, números, espacios y ._-",
                            },
                        })}
                        className={errors.nombre ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.nombre?.message}</p>
                </div>
                <div className="form-group form-full">
                    <label>Descripción</label>
                    <textarea
                        rows="5"
                        disabled={isSubmitting}
                        {...register("descripcion", {
                            maxLength: {
                                value: 1000,
                                message: "Máximo 1000 caracteres.",
                            },
                        })}
                        className={errors.descripcion ? "input-error" : ""}
                    />
                    <p className="form-error">{errors.descripcion?.message}</p>
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
                            : "Crear modelo"}
                </button>

                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>

                <Link className="btn btn-secondary" to="/modelos/home">
                    Volver
                </Link>
            </div>
        </form>
  );
}
