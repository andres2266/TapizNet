import React from 'react'
import { useEmpleadosView } from '../../hooks/empleados/useEmpleadosView';
import { Link, useNavigate } from 'react-router-dom';


export default function ViewEmpleadosPage() {
    const {dispatch, empleados, loading, search, rol,error,page } = useEmpleadosView();
   const navigate = useNavigate()
    if (loading) {
      
        return <p>Cargando empleados...</p>;
    }
    
     if (error) {
        return <p>Error al cargar empleados.</p>;
    }
    
  return (
  <section className="page">
    <div className="page-header">
        <h1>Trabajadores</h1>
        <p>Consulta y administra los empleados del taller.</p>
    </div>

    <div className="card">
        <div className="filters">
            <div className="form-group">
                <label>Buscar</label>
                <input
                    type="text"
                    value={search}
                    placeholder="Nombre, apellido o usuario"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_FILTER",
                            field: "search",
                            value: e.target.value,
                        })
                    }
                />
            </div>

            <div className="form-group">
                <label>Rol</label>
                <select
                    value={rol}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_FILTER",
                            field: "rol",
                            value: e.target.value,
                        })
                    }
                >
                    <option value="">Todos</option>
                    <option value="gestor">Gestor</option>
                    <option value="administrador">Administrador</option>
                    <option value="operario">Operario</option>
                </select>
            </div>
        </div>

        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>
                                <strong>{empleado.nombre} {empleado.apellido}</strong>
                            </td>

                            <td>{empleado.usuario}</td>

                            <td>
                                <span className="badge badge-muted">
                                    {empleado.rol}
                                </span>
                            </td>

                            <td>
                                <span className={empleado.activo ? "status status-active" : "status status-inactive"}>
                                    <span className="status-dot"></span>
                                    {empleado.activo ? "Activo" : "Inactivo"}
                                </span>
                            </td>

                            <td>
                                <div className="table-actions">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/empleados/${empleado.id}/detail`)}
                                    >
                                        Ver
                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/empleados/${empleado.id}/editar`)}
                                    >
                                        Editar
                                    </button>

                                    <button className={empleado.activo ? "btn btn-danger" : "btn btn-success"}>
                                        {empleado.activo ? "Dar de baja" : "Activar"}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="pagination">
            <button
                className="btn btn-secondary"
                disabled={page === 1}
                onClick={() => dispatch({ type: "SET_PAGE", page: page - 1 })}
            >
                Anterior
            </button>

            <button
                className="btn btn-secondary"
                onClick={() => dispatch({ type: "SET_PAGE", page: page + 1 })}
            >
                Siguiente
            </button>

            <Link className="btn btn-secondary" to="/homeAdmin">
                Volver
            </Link>
        </div>
    </div>
</section>
  )
}
