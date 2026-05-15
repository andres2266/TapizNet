// src/pages/auth/LoginPage.jsx
import React from "react";
import { useLoginForm } from "../../hooks/auth/useLoginForm.js";
import { Link } from "react-router-dom";
import Icons from "../../utils/icons.jsx";
import logoDeTagma from '../../assets/logoDeTagma.png';

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
        successMessage,
        loginTrabajador,
    } = useLoginForm();

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <img src={logoDeTagma} alt="Tagma Logo" className="logo-image" />
                    </div>
                    <h1>Tagma</h1>
                    <p>Inicia sesión en tu panel de gestión</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit(loginTrabajador)}>
                    {generalError && (
                        <div className="form-alert form-alert-error">
                            <Icons.Alert size={16} />
                            <span>{generalError}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="form-alert form-alert-success">
                            <Icons.Check size={16} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label>
                            <Icons.UserSingle size={14} />
                            Nombre de usuario o email
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: admin o admin@email.com"
                            className={errors.usuario ? "input-error" : ""}
                            {...register("usuario", {
                                required: "El usuario es obligatorio.",
                                minLength: {
                                    value: 3,
                                    message: "El usuario debe tener al menos 3 caracteres.",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "El usuario no puede superar los 50 caracteres.",
                                },
                                pattern: {
                                    value: /^([^\s@]+@[^\s@]+\.[^\s@]+|[a-zA-Z0-9_.-]+)$/,
                                    message: "Ingresa un email válido o un nombre de usuario.",
                                },
                            })}
                        />
                        {errors.usuario && (
                            <p className="form-error">
                                <Icons.Alert size={10} />
                                {errors.usuario.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>
                            <Icons.Lock size={14} />
                            Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Tu contraseña"
                            className={errors.password ? "input-error" : ""}
                            {...register("password", {
                                required: "La contraseña es obligatoria.",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="form-error">
                                <Icons.Alert size={10} />
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        className="btn-auth"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Icons.Refresh size={14} />
                                Ingresando...
                            </>
                        ) : (
                            <>
                                <Icons.ArrowRight size={14} />
                                Iniciar sesión
                            </>
                        )}
                    </button>
                </form>

                <p className="auth-footer-text">
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </section>
    );
}