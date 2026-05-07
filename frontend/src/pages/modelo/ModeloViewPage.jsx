import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import { useModelosView } from "../../hooks/modelos/useModelosView";

export default function ModeloViewPage() {
    const {dispatch, modelos,loading,search,estadoProceso,error,page,lastPage,} = useModelosView();
    console.log(modelos)
const navigate = useNavigate();

if (loading) {
    return <p>Cargando modelos...</p>;
}

if (error) {
    return <p>Error al cargar modelos.</p>;
}
 return (
    <section className="page">
        <div className="page-header">
            <h1>Modelos</h1>
            <p>Consulta los modelos y administra sus procesos de fabricación.</p>
        </div>

        <div className="card">
            <div className="filters">
                <div className="form-group">
                    <label>Buscar</label>
                    <input
                        type="text"
                        value={search}
                        placeholder="Nombre o descripción"
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
                    <label>Proceso fabricación</label>
                    <select
                        value={estadoProceso}
                        onChange={(e) =>
                            dispatch({
                                type: "SET_FILTER",
                                field: "estadoProceso",
                                value: e.target.value,
                            })
                        }
                    >
                        <option value="">Todos</option>
                        <option value="configurado">Configurado</option>
                        <option value="sin_proceso">Sin proceso</option>
                    </select>
                </div>
            </div>

            {modelos.length === 0 ? (
                <div className="empty-state">
                    <h3>No hay modelos registrados</h3>
                    <p>Crea modelos para poder configurar sus procesos de fabricación.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Modelo</th>
                                <th>Descripción</th>
                                <th>Proceso fabricación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {modelos.map((modelo) => {
                                const tieneProceso =
                                    modelo.procesos_fabricacion_count > 0;

                                return (
                                    <tr key={modelo.id}>
                                        <td>
                                            <strong>{modelo.nombre}</strong>
                                        </td>

                                        <td>{modelo.descripcion || "Sin descripción"}</td>

                                        <td>
                                            <span
                                                className={
                                                    tieneProceso
                                                        ? "badge badge-success"
                                                        : "badge badge-warning"
                                                }
                                            >
                                                {tieneProceso
                                                    ? "Configurado"
                                                    : "Sin proceso"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() =>
                                                        navigate(`/modelos/${modelo.id}/detail`)
                                                    }
                                                >
                                                    Ver
                                                </button>

                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        navigate(`/modelos/${modelo.id}/editar`)
                                                    }
                                                >
                                                    Editar modelo
                                                </button>

                                                {tieneProceso ? (
                                                    <>
                                                        <button
                                                            className="btn btn-secondary"
                                                            onClick={() =>
                                                                navigate(`/modelos/${modelo.id}/proceso`)
                                                            }
                                                        >
                                                            Ver proceso
                                                        </button>

                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() =>
                                                                navigate(`/modelos/${modelo.id}/proceso/editar`)
                                                            }
                                                        >
                                                            Editar proceso
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() =>
                                                            navigate(`/procesoFabricacion/${modelo.id}/create`)
                                                        }
                                                    >
                                                        Crear proceso
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="pagination">
                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() =>
                        dispatch({
                            type: "SET_PAGE",
                            page: page - 1,
                        })
                    }
                >
                    Anterior
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={page >= lastPage}
                    onClick={() =>
                        dispatch({
                            type: "SET_PAGE",
                            page: page + 1,
                        })
                    }
                >
                    Siguiente
                </button>

                <Link className="btn btn-secondary" to="/homeAdmin">
                    Volver
                </Link>
            </div>
        </div>
    </section>
);
}



