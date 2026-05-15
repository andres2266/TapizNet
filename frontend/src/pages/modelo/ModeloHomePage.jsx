// src/pages/admins/modelos/ModeloHomePage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../utils/icons";
import { useModeloEstadisticas } from "../../hooks/modelos/useModelosStatistics.JS";

export default function ModeloHomePage() {
    const navigate = useNavigate();
    const {
        estadisticas,
        loading,
        generalError,
    } = useModeloEstadisticas();

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Modelos</h1>
                    <p>
                        Administra los modelos de fabricación y su configuración
                        productiva.
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

            {generalError && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>{generalError}</span>
                </div>
            )}

            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-icon blue">
                        <Icons.Models size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>Modelos activos</h3>
                        <strong>
                            {loading ? "..." : estadisticas.modelos_activos}
                        </strong>
                        <span>Disponibles para producción</span>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon orange">
                        <Icons.Alert size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>Modelos sin proceso</h3>
                        <strong>
                            {loading ? "..." : estadisticas.modelos_sin_proceso}
                        </strong>
                        <span>Requieren configuración</span>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="stats-icon green">
                        <Icons.Check size={24} />
                    </div>
                    <div className="stats-content">
                        <h3>Listos para producción</h3>
                        <strong>
                            {loading ? "..." : estadisticas.modelos_listos_produccion}
                        </strong>
                        <span>Con proceso completo</span>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="home-menu">
                <Link to="/modelos/create" className="menu-card create">
                    <div className="menu-card-icon">
                        <Icons.Plus size={28} />
                    </div>
                    <div className="menu-card-content">
                        <h3>Crear modelo</h3>
                        <p>Registra un nuevo modelo de fabricación</p>
                    </div>
                    <Icons.ArrowRight size={16} className="menu-card-arrow" />
                </Link>

                <Link to="/modelos/view" className="menu-card view">
                    <div className="menu-card-icon">
                        <Icons.View size={28} />
                    </div>
                    <div className="menu-card-content">
                        <h3>Ver modelos</h3>
                        <p>Consulta y administra los modelos existentes</p>
                    </div>
                    <Icons.ArrowRight size={16} className="menu-card-arrow" />
                </Link>
            </div>

            {/* Botón de volver */}
            <div className="page-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/homeAdmin')}
                >
                    <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                    Volver
                </button>
            </div>
        </section>
    );
}