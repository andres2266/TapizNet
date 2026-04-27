import React from 'react'
import { useLoginForm } from '../../hooks/auth/useLoginForm.js';
import { Link } from 'react-router-dom';


export default function LoginPage() {
  const { register, handleSubmit, errors,isSubmitting, loginTrabajador } = useLoginForm();
  return (
 <section className="auth-page">
            <div className="auth-card auth-card-small">
                <div className="auth-header">
                    <h1>Iniciar sesión</h1>
                    <p>Entra a tu panel de TapizNet.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit(loginTrabajador)}>
                    <div className="form-group">
                        <label>Nombre de usuario o email</label>
                        <input
                            type="text"
                            placeholder="Ej: admin o admin@email.com"
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
                        {errors.usuario && <p className="form-error">{errors.usuario.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Tu contraseña"
                            {...register("password", {
                                required: "La contraseña es obligatoria.",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres.",
                                },
                            })}
                        />
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>

                    <button className="btn-auth btn-primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Ingresando..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </section>
  )
}
