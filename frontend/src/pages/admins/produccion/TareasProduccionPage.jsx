// src/pages/admins/produccion/TareasProduccionPage.jsx
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../../utils/icons";
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
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Tareas de producción</h1>
                    <p>Gestiona las tareas generadas desde las órdenes de producción.</p>
                </div>
                <div className="page-header-date">
                    <Icons.Calendar size={14} />
                    {new Date().toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>

            {/* Filtros */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="filters">
                    <div className="form-group">
                        <label>
                            <Icons.Search size={12} />
                            Buscar
                        </label>
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
                        <label>
                            <Icons.Role size={12} />
                            Puesto de trabajo
                        </label>
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
                        <label>
                            <Icons.UserSingle size={12} />
                            Sin asignar
                        </label>
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
                            <option value="">Todas las tareas</option>
                            <option value="1">Solo sin asignar</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>{error}</span>
                </div>
            )}

            {loading && (
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando tareas de producción...</p>
                </div>
            )}

            {!loading && !error && tareas.length === 0 && (
                <div className="card">
                    <div className="empty-state">
                        <Icons.Info size={48} />
                        <p>No hay tareas de producción con los filtros seleccionados.</p>
                    </div>
                </div>
            )}

            {!loading && !error && tareas.length > 0 && (
                <div className="card">
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
                                        <td>
                                            <strong>{tarea.orden_produccion?.codigo || "Sin orden"}</strong>
                                        </td>
                                        <td>
                                            {tarea.unidad_fabricacion?.numero_unidad
                                                ? `Unidad ${tarea.unidad_fabricacion.numero_unidad}`
                                                : "Sin unidad"}
                                        </td>
                                        <td>
                                            <strong>{tarea.nombre_tarea}</strong>
                                        </td>
                                        <td>
                                            {tarea.puesto_trabajo?.nombre || "Sin puesto"}
                                        </td>
                                        <td>
                                            <span className={tarea.estado === "pendiente" ? "status status-warning" : 
                                                           tarea.estado === "en_progreso" ? "status status-info" :
                                                           tarea.estado === "completada" ? "status status-success" : 
                                                           "status status-danger"}>
                                                <span className="status-dot"></span>
                                                {tarea.estado === "pendiente" && "Pendiente"}
                                                {tarea.estado === "en_progreso" && "En progreso"}
                                                {tarea.estado === "completada" && "Completada"}
                                                {tarea.estado === "cancelada" && "Cancelada"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge-muted priority-${tarea.orden_produccion?.prioridad || 'normal'}`}>
                                                {tarea.orden_produccion?.prioridad || "Normal"}
                                            </span>
                                        </td>
                                        <td className="precio-cell">
                                            {Number(tarea.ganancia_destajo || 0).toFixed(2)} €
                                        </td>
                                        <td className="table-actions">
                                            {tarea.estado === "pendiente" ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => handleAsignar(tarea.id, tarea.puesto_trabajo_id)}
                                                >
                                                    Asignar
                                                </button>
                                            ) : (
                                                <span className="badge-muted">No disponible</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
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
                            <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                            Anterior
                        </button>

                        <span className="page-info">
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
                            <Icons.ArrowRight size={12} />
                        </button>

                        <Link className="btn btn-secondary" to="/produccion/home">
                            <Icons.Close size={12} />
                            Volver
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}