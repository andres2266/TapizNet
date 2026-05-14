import { Link, useNavigate } from "react-router-dom";
import { useTareasProduccionView } from "../../../hooks/tareasProduccion/useTareasProduccionView";


export function TareasProduccionPage() {
    const navigate = useNavigate();

    const {
        tareas,
        puestosTrabajo,
        loading,
        error,
        search,
        estado,
        puestoTrabajoId,
        soloSinAsignar,
        page,
        lastPage,
        dispatch,
    } = useTareasProduccionView();

    const handleAsignar = (tareaId, puestoTrabajoId) => {
        navigate(`/produccion/tareas/${tareaId}/asignar/${puestoTrabajoId}`);
    };

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Tareas de producción</h1>
                    <p>Gestiona las tareas generadas desde las órdenes de producción.</p>
                </div>
            </div>

            <section className="card">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Buscar</label>
                        <input
                            type="text"
                            value={search}
                            placeholder="Buscar por tarea, orden o empleado"
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
                        <label>Puesto de trabajo</label>

                        <select
                            value={puestoTrabajoId}
                            onChange={(e) =>
                                dispatch({
                                    type: "SET_FILTER",
                                    field: "puestoTrabajoId",
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value="">Todos los puestos</option>

                            {puestosTrabajo.map((puesto) => (
                                <option key={puesto.id} value={puesto.id}>
                                    {puesto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Sin asignar</label>
                        <select
                            value={soloSinAsignar}
                            onChange={(e) =>
                                dispatch({
                                    type: "SET_FILTER",
                                    field: "soloSinAsignar",
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value="">Todas</option>
                            <option value="1">Solo sin asignar</option>
                        </select>
                    </div>
                </div>
            </section>

            {error && (
                <div className="form-alert form-alert-error">
                    {error}
                </div>
            )}

            {loading && <p>Cargando tareas de producción...</p>}

            {!loading && !error && tareas.length === 0 && (
                <section className="card">
                    <p>No hay tareas de producción con los filtros seleccionados.</p>
                </section>
            )}

            {!loading && !error && tareas.length > 0 && (
                <section className="card">
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Orden</th>
                                    <th>Unidad</th>
                                    <th>Tarea</th>
                                    <th>Puesto</th>
                                    <th>Estado</th>
                                    <th>Prioridad</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tareas.map((tarea) => (
                                    <tr key={tarea.id}>
                                        <td>{tarea.orden_produccion?.codigo || "Sin orden"}</td>

                                        <td>
                                            {tarea.unidad_fabricacion?.numero_unidad
                                                ? `Unidad ${tarea.unidad_fabricacion.numero_unidad}`
                                                : "Sin unidad"}
                                        </td>

                                        <td>
                                            <strong>{tarea.nombre_tarea}</strong>
                                        </td>

                                        <td>{tarea.puesto_trabajo?.nombre || "Sin puesto"}</td>

                                        <td>
                                            <span className={`status-badge status-${tarea.estado}`}>
                                                {tarea.estado}
                                            </span>
                                        </td>

                                        <td>{tarea.orden_produccion?.prioridad || "Sin prioridad"}</td>
                                                {console.log(tarea + 'sca')}
                                        <td>
                                            {Number(tarea.ganancia_destajo || 0).toFixed(2)} €
                                        </td>

                                        <td>
                                            {tarea.estado === "pendiente" ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => handleAsignar(tarea.id, tarea.puesto_trabajo_id)}
                                                >
                                                    Asignar
                                                </button>
                                            ) : (
                                                <span className="table-muted">No disponible</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="page-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={page <= 1}
                            onClick={() =>
                                dispatch({
                                    type: "SET_PAGE",
                                    page: page - 1,
                                })
                            }
                        >
                            Anterior
                        </button>

                        <span>
                            Página {page} de {lastPage}
                        </span>

                        <button
                            type="button"
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
                        <Link to={'/produccion/home'} className="btn btn-secondary">
                            Volver
                        </Link>
                    </div>
                </section>
            )}
        </main>
    );
}