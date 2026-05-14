// src/pages/admins/PuestosTrabajoViewPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icons from '../../../utils/icons';
import { usePuestosTrabajoView } from '../../../hooks/puestoTrabajo/usePuestosTrabajoView';

export default function PuestosTrabajoViewPage() {
    const {
        dispatch,
        puestosTrabajo,
        loading,
        search,
        estado,
        error,
        page,
        actualizarEstadoPuesto,
        generalError,
        successMessage,
        isUpdatingEstado,
    } = usePuestosTrabajoView();

    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState(search || '');
    const [estadoInput, setEstadoInput] = useState(estado || '');

    useEffect(() => {
        dispatch({ type: "SET_FILTER", field: "search", value: searchInput });
    }, [searchInput, dispatch]);

    useEffect(() => {
        dispatch({ type: "SET_FILTER", field: "estado", value: estadoInput });
    }, [estadoInput, dispatch]);

    const handleCambiarEstado = async (puesto) => {
        const nuevoActivo = !puesto.activo;

        const confirmar = window.confirm(
            puesto.activo
                ? "¿Seguro que quieres dar de baja este puesto? No se borrará su historial."
                : "¿Seguro que quieres activar este puesto?"
        );

        if (!confirmar) return;

        await actualizarEstadoPuesto(puesto.id, nuevoActivo);
    };

    if (loading) {
        return (
            <div className="loading-message">
                <Icons.Info size={24} />
                <p>Cargando puestos de trabajo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="form-alert form-alert-error">
                <Icons.Alert size={18} />
                Error al cargar puestos de trabajo.
            </div>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <h1>Puestos de Trabajo</h1>
                <p>Gestión de puestos y roles en la empresa.</p>
            </div>

            {generalError && (
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    {generalError}
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    <Icons.Check size={18} />
                    {successMessage}
                </div>
            )}

            <div className="card">
                <div className="filters">
                    <div className="form-group">
                        <label>
                            <Icons.Search size={12} />
                            Buscar
                        </label>

                        <input
                            type="text"
                            value={searchInput}
                            placeholder="Nombre del puesto"
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        {searchInput && (
                            <button
                                type="button"
                                className="filter-clear-button"
                                onClick={() => setSearchInput('')}
                            >
                                <Icons.Close size={12} />
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>
                            <Icons.Role size={12} />
                            Estado
                        </label>

                        <select
                            value={estadoInput}
                            onChange={(e) => setEstadoInput(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Puesto</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {puestosTrabajo.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                                        <Icons.Info size={20} />
                                        <p>No hay puestos de trabajo registrados</p>
                                    </td>
                                </tr>
                            ) : (
                                puestosTrabajo.map((puesto) => (
                                    <tr key={puesto.id}>
                                        <td>
                                            <strong>{puesto.nombre || '-'}</strong>
                                        </td>

                                        <td>
                                            {puesto.descripcion || '-'}
                                        </td>

                                        <td>
                                            <span className={puesto.activo ? "status status-active" : "status status-inactive"}>
                                                <span className="status-dot"></span>
                                                {puesto.activo ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>

                                        <td>
                                            {puesto.created_at
                                                ? new Date(puesto.created_at).toLocaleDateString('es-ES')
                                                : '-'}
                                        </td>

                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => navigate(`/puestosTrabajo/${puesto.id}/details`)}
                                                >
                                                    
                                                    <Icons.Info size={12} />
                                                    Ver
                                                </button>

                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => navigate(`/puestosTrabajo/${puesto.id}/editar`)}
                                                >
                                                    <Icons.Edit size={12} />
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className={puesto.activo ? "btn btn-danger" : "btn btn-success"}
                                                    disabled={isUpdatingEstado}
                                                    onClick={() => handleCambiarEstado(puesto)}
                                                >
                                                    {isUpdatingEstado
                                                        ? "Procesando..."
                                                        : puesto.activo
                                                            ? "Dar de baja"
                                                            : "Activar"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button
                        className="btn btn-secondary"
                        disabled={page === 1}
                        onClick={() => dispatch({ type: "SET_PAGE", page: page - 1 })}
                    >
                        <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                        Anterior
                    </button>

                    <span className="page-info">Página {page}</span>

                    <button
                        className="btn btn-secondary"
                        onClick={() => dispatch({ type: "SET_PAGE", page: page + 1 })}
                        disabled={puestosTrabajo.length === 0}
                    >
                        Siguiente
                        <Icons.ArrowRight size={12} />
                    </button>

                    <Link className="btn btn-secondary" to="/PuestosTrabajoHome">
                        <Icons.Close size={12} />
                        Volver
                    </Link>
                </div>
            </div>
        </section>
    );
}