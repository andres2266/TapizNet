// src/pages/admins/modelos/ModeloDetailPage.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import Icons from "../../utils/icons";
import { useModeloShow } from "../../hooks/modelos/useModeloshow";

export default function ModeloDetailPage() {
    const { modeloId } = useParams();

    const {
        modelo,
        loading,
        generalError,
    } = useModeloShow(modeloId);

    if (loading) {
        return (
            <section className="page">
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando modelo...</p>
                </div>
            </section>
        );
    }

    if (generalError) {
        return (
            <section className="page">
                <div className="page-header">
                    <h1>Detalle del modelo</h1>
                    <p>No se pudo cargar la información del modelo.</p>
                </div>

                <div className="card">
                    <div className="form-alert form-alert-error">
                        <Icons.Alert size={18} />
                        <span>{generalError}</span>
                    </div>

                    <div className="page-actions">
                        <Link className="btn btn-secondary" to="/modelos/home">
                            <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                            Volver
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    if (!modelo) {
        return (
            <section className="page">
                <div className="page-header">
                    <h1>Detalle del modelo</h1>
                    <p>No se encontró el modelo solicitado.</p>
                </div>

                <div className="card">
                    <div className="empty-state">
                        <Icons.Info size={48} />
                        <p>No se encontró el modelo.</p>
                    </div>

                    <div className="page-actions">
                        <Link className="btn btn-secondary" to="/modelos/home">
                            <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                            Volver
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Detalle del modelo</h1>
                    <p>Consulta la información completa del modelo de fabricación.</p>
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

            <div className="modelo-detail-card">
                {/* Header del modelo con icono */}
                <div className="modelo-detail-header">
                    <div className="modelo-detail-icon">
                        <Icons.Models size={40} />
                    </div>
                    <div className="modelo-detail-title">
                        <h2>{modelo.nombre}</h2>
                        <span className={`modelo-status status-${modelo.activo ? 'active' : 'inactive'}`}>
                            <span className="status-dot"></span>
                            {modelo.activo ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </div>

                {/* Grid de información */}
                <div className="modelo-info-grid">
                    {/* Nombre */}
                    <div className="info-card">
                        <div className="info-card-icon">
                            <Icons.Models size={20} />
                        </div>
                        <div className="info-card-content">
                            <span>Nombre del modelo</span>
                            <strong>{modelo.nombre}</strong>
                        </div>
                    </div>

                    {/* Estado */}
                    <div className="info-card">
                        <div className="info-card-icon">
                            <Icons.Check size={20} />
                        </div>
                        <div className="info-card-content">
                            <span>Estado actual</span>
                            <strong className={modelo.activo ? "text-success" : "text-danger"}>
                                {modelo.activo ? "Activo" : "Inactivo"}
                            </strong>
                        </div>
                    </div>

                    {/* Fecha de creación */}
                    <div className="info-card">
                        <div className="info-card-icon">
                            <Icons.Calendar size={20} />
                        </div>
                        <div className="info-card-content">
                            <span>Fecha de creación</span>
                            <strong>
                                {new Date(modelo.created_at).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </strong>
                        </div>
                    </div>

                    {/* Hora de creación */}
                    <div className="info-card">
                        <div className="info-card-icon">
                            <Icons.Clock size={20} />
                        </div>
                        <div className="info-card-content">
                            <span>Hora de creación</span>
                            <strong>
                                {new Date(modelo.created_at).toLocaleTimeString('es-ES', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </strong>
                        </div>
                    </div>

                    {/* Descripción (ocupa todo el ancho) */}
                    <div className="info-card info-card-full">
                        <div className="info-card-icon">
                            <Icons.Info size={20} />
                        </div>
                        <div className="info-card-content">
                            <span>Descripción</span>
                            <p className="description-text">
                                {modelo.descripcion || "Sin descripción registrada"}
                            </p>
                        </div>
                    </div>

                    {/* Imagen del modelo */}
                    {modelo.imagen_url && (
                        <div className="info-card info-card-full">
                            <div className="info-card-icon">
                                <Icons.Image size={20} />
                            </div>
                            <div className="info-card-content">
                                <span>Imagen del modelo</span>
                                <div className="modelo-image-container">
                                    <img
                                        src={modelo.imagen_url}
                                        alt={modelo.nombre}
                                        className="modelo-image"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Acciones */}
                <div className="page-actions">
                    <Link
                        className="btn btn-primary"
                        to={`/modelos/${modelo.id}/edit`}
                    >
                        <Icons.Edit size={14} />
                        Editar modelo
                    </Link>

                    <Link
                        className="btn btn-secondary"
                        to="/modelos/view"
                    >
                        <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                        Volver
                    </Link>
                </div>
            </div>
        </section>
    );
}