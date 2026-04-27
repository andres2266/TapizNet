import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEmpleadoUpdateForm } from '../../hooks/empleados/useEmpleadosUpdateForm';

export default function UpdateEmpleadoFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, errors, isSubmitting, actualizarEmpleado, } = useEmpleadoUpdateForm();

    const onSubmit = async (data) => {
        await actualizarEmpleado(id, data);
        navigate("/homeAdmin");
    };
    return (
      <section className="page">
    <div className="page-header">
        <h1>Editar empleado</h1>
        <p>Rellena solo los campos que quieras cambiar.</p>
    </div>

    <form className="card employee-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
            <div className="form-group">
                <label>Usuario</label>
                <input type="text" {...register("usuario")} />
                <p className="form-error">{errors.usuario?.message}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" {...register("email")} />
                <p className="form-error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
                <label>Contraseña</label>
                <input type="password" {...register("password")} />
                <p className="form-error">{errors.password?.message}</p>
            </div>

            <div className="form-group">
                <label>Nombre</label>
                <input type="text" {...register("nombre")} />
                <p className="form-error">{errors.nombre?.message}</p>
            </div>

            <div className="form-group">
                <label>Apellido</label>
                <input type="text" {...register("apellido")} />
                <p className="form-error">{errors.apellido?.message}</p>
            </div>

            <div className="form-group">
                <label>Teléfono</label>
                <input type="text" {...register("telefono")} />
                <p className="form-error">{errors.telefono?.message}</p>
            </div>

            <div className="form-group">
                <label>DNI</label>
                <input type="text" {...register("dni")} />
                <p className="form-error">{errors.dni?.message}</p>
            </div>

            <div className="form-group">
                <label>Tipo contrato</label>
                <select {...register("tipo_contrato")}>
                    <option value="">No cambiar</option>
                    <option value="horas">Horas</option>
                    <option value="destajo">Destajo</option>
                </select>
                <p className="form-error">{errors.tipo_contrato?.message}</p>
            </div>

            <div className="form-group">
                <label>Precio hora</label>
                <input type="number" step="0.01" {...register("precio_hora")} />
                <p className="form-error">{errors.precio_hora?.message}</p>
            </div>

            <div className="form-group">
                <label>Saldo pendiente</label>
                <input type="number" step="0.01" {...register("saldo_pendiente")} />
                <p className="form-error">{errors.saldo_pendiente?.message}</p>
            </div>

            <div className="form-group">
                <label>Rol</label>
                <select {...register("rol")}>
                    <option value="">No cambiar</option>
                    <option value="administrador">Administrador</option>
                    <option value="gestor">Gestor</option>
                    <option value="operario">Operario</option>
                </select>
                <p className="form-error">{errors.rol?.message}</p>
            </div>

            <div className="form-group">
                <label>Estado</label>
                <select {...register("activo")}>
                    <option value="">No cambiar</option>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                <p className="form-error">{errors.activo?.message}</p>
            </div>
        </div>

        <div className="page-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate("/homeAdmin")}
            >
                Cancelar
            </button>

            <Link className="btn btn-secondary" to="/empleado/view">
                Volver
            </Link>
        </div>
    </form>
</section>
    )
}
