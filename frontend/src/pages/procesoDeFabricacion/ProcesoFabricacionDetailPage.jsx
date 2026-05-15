// src/pages/admins/procesosFabricacion/ProcesoFabricacionDetailPage.jsx
import { useNavigate } from "react-router-dom";
import Icons from "../../utils/icons";
import { useProcesoFabricacionDetalle } from "../../hooks/procesosFabricacion/useProcesoFabricacionDetalle";

export default function ProcesoFabricacionDetailPage() {
    const navigate = useNavigate();

    const {
        modelo,
        procesos,
        loading,
        generalError,
        hasProcesos,
    } = useProcesoFabricacionDetalle();

    if (loading) {
        return (
            <section className="page">
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando proceso de fabricación...</p>
                </div>
            </section>
        );
    }

    if (generalError) {
        return (
            <section className="page">
                <div className="page-header">
                    <h1>Proceso de fabricación</h1>
                    <p>No se pudo cargar la información del proceso.</p>
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
                            <Icons.Close size={12} />
                            Volver
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!modelo) {
        return (
            <section className="page">
                <div className="page-header">
                    <h1>Proceso de fabricación</h1>
                    <p>No se encontró información del modelo.</p>
                </div>

                <div className="card">
                    <div className="empty-state">
                        <Icons.Info size={48} />
                        <p>No hay datos para mostrar.</p>
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

    // Función para convertir a número de forma segura
    const toNumber = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcular totales de forma segura
    const totalMinutos = procesos.reduce((total, p) => total + toNumber(p.tiempo_estimado_minutos), 0);
    const totalPrecioDestajo = procesos.reduce((total, p) => total + toNumber(p.precio_destajo), 0);

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Proceso de fabricación</h1>
                    <p>
                        Consulta las fases necesarias para fabricar el modelo{" "}
                        <strong>{modelo.nombre}</strong>.
                    </p>
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

            <div className="proceso-detail-card">
                {/* Header del modelo */}
                <div className="modelo-header">
                    <div className="modelo-icon">
                        <Icons.Models size={32} />
                    </div>
                    <div className="modelo-info">
                        <h2>{modelo.nombre}</h2>
                        {modelo.descripcion && (
                            <p>{modelo.descripcion}</p>
                        )}
                    </div>
                </div>

                {!hasProcesos ? (
                    <div className="empty-proceso">
                        <Icons.Box size={48} />
                        <h3>Sin proceso definido</h3>
                        <p>Este modelo todavía no tiene un proceso de fabricación definido.</p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate(`/modelos/${modelo.id}/proceso/crear`)}
                        >
                            <Icons.Plus size={14} />
                            Definir proceso
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Timeline de fases */}
                        <div className="proceso-timeline">
                            <div className="timeline-line"></div>
                            {procesos.map((proceso, index) => (
                                <div key={proceso.id} className="timeline-item">
                                    <div className="timeline-marker">
                                        <span className="marker-number">{proceso.orden}</span>
                                        <div className="marker-line"></div>
                                    </div>
                                    
                                    <div className="fase-detail-card">
                                        <div className="fase-header-detail">
                                            <div className="fase-badge">
                                                <Icons.Progress size={16} />
                                                <span>Fase {proceso.orden}</span>
                                            </div>
                                            <h3>{proceso.nombre_tarea}</h3>
                                        </div>

                                        <div className="fase-info-grid">
                                            <div className="info-chip">
                                                <Icons.Role size={14} />
                                                <span>{proceso.puesto_trabajo?.nombre || "Sin puesto asignado"}</span>
                                            </div>

                                            <div className="info-chip">
                                                <Icons.Clock size={14} />
                                                <span>{toNumber(proceso.tiempo_estimado_minutos) > 0 ? `${toNumber(proceso.tiempo_estimado_minutos)} minutos` : "No definido"}</span>
                                            </div>

                                            <div className="info-chip highlight">
                                                <Icons.Money size={14} />
                                                <span>{toNumber(proceso.precio_destajo) > 0 ? `$${toNumber(proceso.precio_destajo).toFixed(2)}` : "No definido"}</span>
                                            </div>
                                        </div>

                                        {proceso.descripcion && (
                                            <div className="fase-description">
                                                <Icons.Info size={14} />
                                                <p>{proceso.descripcion}</p>
                                            </div>
                                        )}

                                        {proceso.parametros_fabricacion?.length > 0 && (
                                            <div className="parametros-list">
                                                <div className="parametros-title">
                                                    <Icons.Box size={14} />
                                                    <span>Parámetros de fabricación</span>
                                                </div>
                                                <div className="parametros-grid">
                                                    {proceso.parametros_fabricacion.map((parametro) => (
                                                        <div key={parametro.id} className="parametro-item">
                                                            <strong>{parametro.nombre_parametro}:</strong>
                                                            <span>{parametro.valor || "Sin valor"}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen del proceso */}
                        <div className="proceso-resumen">
                            <div className="resumen-item">
                                <Icons.Box size={18} />
                                <div>
                                    <span>Total de fases</span>
                                    <strong>{procesos.length} {procesos.length === 1 ? 'fase' : 'fases'}</strong>
                                </div>
                            </div>
                            <div className="resumen-item">
                                <Icons.Clock size={18} />
                                <div>
                                    <span>Tiempo total estimado</span>
                                    <strong>{totalMinutos} minutos</strong>
                                </div>
                            </div>
                            <div className="resumen-item highlight">
                                <Icons.Money size={18} />
                                <div>
                                    <span>Costo total por destajo</span>
                                    <strong>${totalPrecioDestajo.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    </>
                )}

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