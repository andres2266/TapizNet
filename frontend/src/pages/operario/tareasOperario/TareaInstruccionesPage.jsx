// src/pages/operario/TareaInstruccionesPage.jsx
import { useNavigate } from "react-router-dom";
import Icons from "../../../utils/icons";
import { useTareaInstrucciones } from "../../../hooks/tareasProduccion/useTareaInstrucciones";

export default function TareaInstruccionesPage() {
    const navigate = useNavigate();

    const {
        tarea,
        parametros,
        loading,
        generalError,
        hasParametros,
    } = useTareaInstrucciones();

    if (loading) {
        return (
            <section className="page">
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando instrucciones de la tarea...</p>
                </div>
            </section>
        );
    }

    if (generalError) {
        return (
            <section className="page">
                <div className="page-header">
                    <div>
                        <h1>Instrucciones de tarea</h1>
                        <p>No se pudo cargar la información.</p>
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

                <div className="card">
                    <div className="form-alert form-alert-error">
                        <Icons.Alert size={18} />
                        <span>{generalError}</span>
                    </div>

                    <div className="page-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                            Volver
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!tarea) {
        return (
            <section className="page">
                <div className="page-header">
                    <div>
                        <h1>Instrucciones de tarea</h1>
                        <p>No se encontró información de esta tarea.</p>
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

                <div className="card">
                    <div className="empty-state">
                        <Icons.Info size={48} />
                        <p>No se encontró información de esta tarea.</p>
                    </div>

                    <div className="page-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                            Volver
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>{tarea.nombre_tarea}</h1>
                    <p>Instrucciones específicas para realizar esta tarea.</p>
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

            {/* Información de la tarea */}
            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-icon">
                        <Icons.Progress size={32} />
                    </div>
                    <div className="detail-title">
                        <h2>Información de la tarea</h2>
                        <span className={`status-badge status-${tarea.estado || 'pendiente'}`}>
                            <span className="status-dot"></span>
                            {tarea.estado === "pendiente" && "Pendiente"}
                            {tarea.estado === "en_progreso" && "En progreso"}
                            {tarea.estado === "completada" && "Completada"}
                            {tarea.estado === "cancelada" && "Cancelada"}
                            {!tarea.estado && "Sin estado"}
                        </span>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Role size={14} />
                            Puesto de trabajo
                        </div>
                        <div className="detail-value">
                            {tarea.puesto_trabajo?.nombre || "No asignado"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Clock size={14} />
                            Orden de fase
                        </div>
                        <div className="detail-value">
                            {tarea.orden ?? "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Clock size={14} />
                            Tiempo estimado
                        </div>
                        <div className="detail-value">
                            {tarea.tiempo_estimado_minutos
                                ? `${tarea.tiempo_estimado_minutos} minutos`
                                : "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Money size={14} />
                            Precio destajo
                        </div>
                        <div className="detail-value">
                            {Number(tarea.precio_destajo || 0).toFixed(2)} €
                        </div>
                    </div>

                    <div className="detail-item detail-full">
                        <div className="detail-label">
                            <Icons.Info size={14} />
                            Descripción
                        </div>
                        <div className="detail-value description-text">
                            {tarea.descripcion || "Sin descripción"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contexto de producción */}
            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-icon">
                        <Icons.Orders size={32} />
                    </div>
                    <div className="detail-title">
                        <h2>Contexto de producción</h2>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Models size={14} />
                            Modelo
                        </div>
                        <div className="detail-value">
                            {tarea.unidad_fabricacion?.orden_produccion?.modelo?.nombre || "No disponible"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Box size={14} />
                            Orden producción
                        </div>
                        <div className="detail-value">
                            {tarea.unidad_fabricacion?.orden_produccion?.codigo || 
                             `Orden #${tarea.unidad_fabricacion?.orden_produccion?.id || ""}` || 
                             "No disponible"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Box size={14} />
                            Unidad fabricación
                        </div>
                        <div className="detail-value">
                            {tarea.unidad_fabricacion?.codigo ||
                                `Unidad #${tarea.unidad_fabricacion?.id || ""}` ||
                                "No disponible"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Parámetros de la tarea */}
            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-icon">
                        <Icons.Box size={32} />
                    </div>
                    <div className="detail-title">
                        <h2>Parámetros de la tarea</h2>
                    </div>
                </div>

                {!hasParametros ? (
                    <div className="empty-parametros">
                        <Icons.Info size={32} />
                        <p>Esta tarea no tiene parámetros configurados.</p>
                    </div>
                ) : (
                    <div className="parametros-table-container">
                        <table className="parametros-table">
                            <thead>
                                <tr>
                                    <th>Parámetro</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parametros.map((parametro) => (
                                    <tr key={parametro.id}>
                                        <td className="parametro-nombre">
                                            <Icons.Info size={12} />
                                            {parametro.nombre_parametro || parametro.nombre || "Sin nombre"}
                                        </td>
                                        <td className="parametro-valor">
                                            {parametro.valor || parametro.valor_defecto || "Sin valor"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="page-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                    Volver
                </button>
            </div>
        </section>
    );
}