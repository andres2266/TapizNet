import React from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { useTareasEstadisticas } from '../../../hooks/tareasProduccion/useTareasEstadisticas';
import  Icons   from '../../../utils/icons.jsx'

export default function ProduccionHomePage() {
    const { estadisticas, loading, error, obtenerEstadisticas } = useTareasEstadisticas();
    const navigate = useNavigate();
    return (
         <div className="page">
            <div className="page-header">
                <div>
                    <h1>Producción</h1>
                    <p>Control operativo de órdenes, unidades y tareas del taller.</p>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={obtenerEstadisticas}
                    disabled={loading}
                >
                    <Icons.Refresh size={14} />
                    Actualizar
                </button>
            </div>

            {loading && (
                <div className="loading-card">
                    <Icons.Info size={32} />
                    <p>Cargando estadísticas de producción...</p>
                </div>
            )}

            {error && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    {error}
                </div>
            )}

            {!loading && !error && estadisticas && (
                <div className="production-stats-grid">
                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Clock size={24} />
                        </div>
                        <h3>Tareas pendientes</h3>
                        <strong>{estadisticas.tareas_pendientes}</strong>
                        <p>Tareas esperando ser trabajadas.</p>
                    </div>

                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Progress size={24} />
                        </div>
                        <h3>Tareas en progreso</h3>
                        <strong>{estadisticas.tareas_en_progreso}</strong>
                        <p>Tareas activas ahora mismo.</p>
                    </div>

                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Users size={24} />
                        </div>
                        <h3>Empleados trabajando ahora</h3>
                        <strong>{estadisticas.empleados_trabajando_ahora}</strong>
                        <p>Operarios con tareas activas.</p>
                    </div>

                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Orders size={24} />
                        </div>
                        <h3>Órdenes en producción</h3>
                        <strong>{estadisticas.ordenes_en_produccion}</strong>
                        <p>Pedidos actualmente en fabricación.</p>
                    </div>

                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Box size={24} />
                        </div>
                        <h3>Unidades pendientes</h3>
                        <strong>{estadisticas.unidades_pendientes}</strong>
                        <p>Unidades todavía sin iniciar.</p>
                    </div>

                    <div className="production-stat-card">
                        <div className="production-stat-icon">
                            <Icons.Check size={24} />
                        </div>
                        <h3>Tareas completadas hoy</h3>
                        <strong>{estadisticas.tareas_completadas_hoy}</strong>
                        <p>Trabajo cerrado durante el día.</p>
                    </div>
                </div>
            )}

            <div className="card production-actions-card">
                <h2>Acciones de producción</h2>

                <div className="page-actions">
                    <Link
                        to="/produccion/generar-ordenes"
                        className="btn btn-primary"
                    >
                        <Icons.Plus size={14} />
                        Generar órdenes de producción
                    </Link>

                    <Link
                        to="/produccion/asignar-tareas/generar-ordenes"
                        className="btn btn-secondary"
                    >
                        <Icons.UserSingle size={14} />
                        Asignación de tareas
                    </Link>
                </div>
            </div>

            
            <div className="back-button-container">
                <button
                    type="button"
                    className="btn btn-secondary back-button"
                    onClick={() => navigate('/homeAdmin')}
                >
                    <Icons.ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
                    Volver al Panel
                </button>
            </div>
        </div>
    );
}