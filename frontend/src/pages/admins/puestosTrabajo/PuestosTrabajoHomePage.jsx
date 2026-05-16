// src/pages/admins/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePuestosTrabajoEstadisticas } from '../../../hooks/puestoTrabajo/usePuestosTrabajoEstadisticas';
import Icons from '../../../utils/icons';

const HomePage = () => {
    const navigate = useNavigate();
    const { totalPuestos, loading, error, message } = usePuestosTrabajoEstadisticas();

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Panel de Control</h1>
                    <p>Bienvenido al sistema de gestión TapizNet</p>
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

            {/* Mensaje de error */}
            {error && (
                <div className="dashboard-error">
                    <Icons.Alert size={16} />
                    {error}
                </div>
            )}

            {/* Grid de estadísticas - solo 1 tarjeta con tus datos reales */}
            <div className="dashboard-stats">
                {/* Tarjeta: Total Puestos de Trabajo */}
                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-header">
                        <span className="dashboard-stat-title">Total Puestos de Trabajo</span>
                        <div className="dashboard-stat-icon">
                            <Icons.Positions size={20} />
                        </div>
                    </div>
                    {loading ? (
                        <div className="dashboard-stat-loading">
                            <Icons.Info size={16} />
                            Cargando...
                        </div>
                    ) : (
                        <>
                            <div className="dashboard-stat-value">
                                {totalPuestos !== null ? totalPuestos : '0'}
                            </div>
                            <div className="dashboard-stat-subtitle">
                                Roles activos en la empresa
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sección de Accesos Rápidos */}
            <div className="quick-actions-section">
                <div className="quick-actions-title">
                    Accesos Rápidos
                </div>

                <div className="quick-actions-grid">
                    {/* Nuevo Puesto de Trabajo */}
                    <div
                        className="quick-action-card"
                        onClick={() => navigate('/puestosTrabajoForm')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/puestosTrabajoForm')}
                    >
                        <div className="quick-action-icon">
                            <Icons.Plus size={22} />
                        </div>
                        <div className="quick-action-info">
                            <h4>Nuevo Puesto</h4>
                            <p>Crear rol o posición</p>
                        </div>
                    </div>

                    <div
                        className="quick-action-card"
                        onClick={() => navigate('/AsignarPuestoDeTrabajo')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/AsignarPuestoDeTrabajo')}
                    >
                        <div className="quick-action-icon">
                            <Icons.Role size={22} />
                        </div>

                        <div className="quick-action-info">
                            <h4>Asignar Puestos</h4>
                            <p>Asignar puestos a empleados</p>
                        </div>
                    </div>

                    {/* Ver Empleados */}
                    <div
                        className="quick-action-card"
                        onClick={() => navigate('/puestosTrabajoViews')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/puestosTrabajoViews')}
                    >
                        <div className="quick-action-icon">
                            <Icons.Info size={22} />
                        </div>
                        <div className="quick-action-info">
                            <h4>Ver Puestos de Trabajo</h4>
                            <p>Lista y gestión de personal</p>
                        </div>
                    </div>

                    {/* Volver al Home (opcional) */}
                    <div
                        className="quick-action-card"
                        onClick={() => navigate('/homeAdmin')}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/homeAdmin')}
                    >
                        <div className="quick-action-icon">
                            <Icons.Dashboard size={22} />
                        </div>
                        <div className="quick-action-info">
                            <h4>Inicio</h4>
                            <p>Panel principal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;