// src/components/modelos/ModeloForm.jsx
import React from "react";
import { Link } from "react-router-dom";
import Icons from "../../utils/icons";

export default function ModeloForm({
    register,
    handleSubmit,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
    generalError,
    successMessage,
    mode = "create",
}) {
    const isEdit = mode === "edit";

    return (
        <form className="modelo-form" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>{generalError}</span>
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    <Icons.Check size={18} />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="form-grid">
                {/* Nombre del modelo con icono */}
                <div className="form-group form-full">
                    <label>
                        <Icons.Models size={14} />
                        {isEdit ? "Nombre del modelo" : "Nombre del nuevo modelo"}
                    </label>
                    <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder={
                            isEdit
                                ? "Ej: Sofá Chester actualizado"
                                : "Ej: Sofá Chester 3 plazas"
                        }
                        {...register("nombre", {
                            required: "El nombre del modelo es obligatorio.",
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
                    {errors.nombre && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {errors.nombre?.message}
                        </p>
                    )}
                </div>

                {/* Descripción con icono */}
                <div className="form-group form-full">
                    <label>
                        <Icons.Info size={14} />
                        Descripción
                    </label>
                    <textarea
                        rows="5"
                        disabled={isSubmitting}
                        placeholder={
                            isEdit
                                ? "Actualiza la descripción del modelo..."
                                : "Describe materiales, medidas, tipo de tapizado o detalles de fabricación..."
                        }
                        {...register("descripcion", {
                            maxLength: {
                                value: 1000,
                                message: "Máximo 1000 caracteres.",
                            },
                        })}
                        className={errors.descripcion ? "input-error" : ""}
                    />
                    {errors.descripcion && (
                        <p className="form-error">
                            <Icons.Alert size={10} />
                            {errors.descripcion?.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="form-actions-buttons">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Icons.Refresh size={14} />
                            {isEdit ? "Guardando..." : "Creando..."}
                        </>
                    ) : (
                        <>
                            <Icons.Save size={14} />
                            {isEdit ? "Guardar cambios" : "Crear modelo"}
                        </>
                    )}
                </button>

                {onCancel && (
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        <Icons.Close size={14} />
                        Cancelar
                    </button>
                )}

                <Link className="btn btn-secondary" to="/modelos/home">
                    <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                    Volver
                </Link>
            </div>
        </form>
    );
}