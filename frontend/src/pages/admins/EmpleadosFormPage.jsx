import React from 'react'
import { Link } from 'react-router-dom';
import { useEmpleadoForm } from '../../hooks/empleados/useEmpleadoForm';



export default function EmpleadoFormPage() {
   const {register,handleSubmit,errors,isSubmitting,crearTrabajador,} = useEmpleadoForm();

  return (
<section className="page">
  <div className="page-header">
    <h1>Crear trabajador</h1>
    <p>Registra un nuevo empleado para el taller.</p>
  </div>

  <form className="card employee-form" onSubmit={handleSubmit(crearTrabajador)}>
    <div className="form-grid">
      <div className="form-group">
        <label>Usuario</label>
        <input type="text" disabled={isSubmitting} {...register("usuario")} />
        <p className="form-error">{errors.usuario?.message}</p>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" disabled={isSubmitting} {...register("email")} />
        <p className="form-error">{errors.email?.message}</p>
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input type="password" disabled={isSubmitting} {...register("password")} />
        <p className="form-error">{errors.password?.message}</p>
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input type="text" disabled={isSubmitting} {...register("nombre")} />
        <p className="form-error">{errors.nombre?.message}</p>
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input type="text" disabled={isSubmitting} {...register("apellido")} />
        <p className="form-error">{errors.apellido?.message}</p>
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input type="text" disabled={isSubmitting} {...register("telefono")} />
        <p className="form-error">{errors.telefono?.message}</p>
      </div>

      <div className="form-group">
        <label>DNI</label>
        <input type="text" disabled={isSubmitting} {...register("dni")} />
        <p className="form-error">{errors.dni?.message}</p>
      </div>

      <div className="form-group">
        <label>Tipo contrato</label>
        <select disabled={isSubmitting} {...register("tipo_contrato")}>
          <option value="">Selecciona un tipo</option>
          <option value="horas">Horas</option>
          <option value="destajo">Destajo</option>
        </select>
        <p className="form-error">{errors.tipo_contrato?.message}</p>
      </div>

      <div className="form-group">
        <label>Precio por hora</label>
        <input type="number" step="0.01" disabled={isSubmitting} {...register("precio_hora")} />
        <p className="form-error">{errors.precio_hora?.message}</p>
      </div>

      <div className="form-group">
        <label>Rol</label>
        <select disabled={isSubmitting} {...register("rol")}>
          <option value="">Selecciona un rol</option>
          <option value="administrador">Administrador</option>
          <option value="gestor">Gestor</option>
          <option value="operario">Operario</option>
        </select>
        <p className="form-error">{errors.rol?.message}</p>
      </div>
    </div>

    <label className="checkbox-card">
      <input type="checkbox" disabled={isSubmitting} {...register("activo")} defaultChecked />
      <span>
        <strong>Empleado activo</strong>
        <small>El trabajador podrá iniciar sesión y recibir tareas.</small>
      </span>
    </label>

    <div className="page-actions">
      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando..." : "Crear trabajador"}
      </button>

      <Link className="btn btn-secondary" to="/homeAdmin">
        Volver
      </Link>
    </div>
  </form>
</section>
  )
}

