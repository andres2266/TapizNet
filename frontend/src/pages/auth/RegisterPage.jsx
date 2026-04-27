import React from 'react'
import { useRegisterForm} from '../../hooks/auth/useRegisterForm'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
    const {register,handleSubmit,watch,errors,isSubmitting,registerPropietaio} = useRegisterForm()
  return (
 <section className="auth-page">
            <div className="auth-card auth-card-large">
                <div className="auth-header">
                    <h1>Crear cuenta</h1>
                    <p>Registra tu taller y crea el usuario administrador.</p>
                </div>

                <form className="auth-form auth-form-grid" onSubmit={handleSubmit(registerPropietaio)}>
                    <div className="form-group">
                        <label>Nombre de la empresa</label>
                        <input type="text" {...register("empresa_nombre", { required: "El nombre de la empresa es obligatorio." })} />
                        {errors.empresa_nombre && <p className="form-error">{errors.empresa_nombre.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Correo de la empresa</label>
                        <input type="email" {...register("empresa_email", { required: "El correo de la empresa es obligatorio." })} />
                        {errors.empresa_email && <p className="form-error">{errors.empresa_email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Teléfono de la empresa</label>
                        <input type="text" {...register("empresa_telefono")} />
                        {errors.empresa_telefono && <p className="form-error">{errors.empresa_telefono.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Dirección de la empresa</label>
                        <input type="text" {...register("empresa_direccion")} />
                        {errors.empresa_direccion && <p className="form-error">{errors.empresa_direccion.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Nombre del propietario</label>
                        <input type="text" {...register("nombre", { required: "El nombre es obligatorio." })} />
                        {errors.nombre && <p className="form-error">{errors.nombre.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" {...register("apellido")} />
                        {errors.apellido && <p className="form-error">{errors.apellido.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input type="text" {...register("usuario", { required: "El usuario es obligatorio." })} />
                        {errors.usuario && <p className="form-error">{errors.usuario.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" {...register("password", { required: "La contraseña es obligatoria." })} />
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            {...register("password_confirmation", {
                                required: "Debes confirmar la contraseña.",
                                validate: value => value === watch("password") || "Las contraseñas no coinciden.",
                            })}
                        />
                        {errors.password_confirmation && <p className="form-error">{errors.password_confirmation.message}</p>}
                    </div>
                    
                    <button className="btn-auth btn-primary auth-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Crear cuenta"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </section>
  )
}
