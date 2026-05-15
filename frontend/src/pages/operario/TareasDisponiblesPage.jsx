// src/pages/operario/TareasDisponiblesPage.jsx
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../utils/icons";
import { useTareasDisponibles } from "../../hooks/empleados/useTareasDisponibles";
import { TareasDisponiblesTable } from "../../components/Operario/TareasDisponiblesTable";

export function TareasDisponiblesPage() {
    const navigate = useNavigate();

    const {
        tareas,
        loading,
        assigning,
        error,
        successMessage,
        search,
        prioridad,
        page,
        currentPage,
        lastPage,
        total,
        handleFilterChange,
        changePage,
        autoAsignarTarea,
        clearMessages,
    } = useTareasDisponibles();

    const handleAutoAsignar = async (tareaId) => {
        await autoAsignarTarea(tareaId);
    };

    const handleVerProceso = (tareaId) => {
         navigate(`/tareas/${tareaId}/showInstrucciones/`);
    };
  
    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Tareas disponibles</h1>
                    <p>
                        Aquí puedes ver las tareas disponibles según tu puesto
                        de trabajo.
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

            <div className="card">
                {/* Mensaje de error */}
                {error && (
                    <div className="form-alert form-alert-error">
                        <Icons.Alert size={18} />
                        <span>{error}</span>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={clearMessages}
                        >
                            <Icons.Close size={12} />
                        </button>
                    </div>
                )}

                {/* Mensaje de éxito */}
                {successMessage && (
                    <div className="form-alert form-alert-success">
                        <Icons.Check size={18} />
                        <span>{successMessage}</span>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={clearMessages}
                        >
                            <Icons.Close size={12} />
                        </button>
                    </div>
                )}

                <div className="filters">
                    <div className="form-group">
                        <label>
                            <Icons.Search size={12} />
                            Buscar tarea
                        </label>
                        <input
                            type="text"
                            name="search"
                            value={search}
                            onChange={handleFilterChange}
                            placeholder="Ej: tapizar, sofá, OP-2026..."
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <Icons.Alert size={12} />
                            Prioridad
                        </label>
                        <select
                            name="prioridad"
                            value={prioridad}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todas</option>
                            <option value="baja">Baja</option>
                            <option value="normal">Normal</option>
                            <option value="alta">Alta</option>
                            <option value="urgente">Urgente</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-message">
                        <Icons.Info size={24} />
                        <p>Cargando tareas disponibles...</p>
                    </div>
                ) : (
                    <>
                        <TareasDisponiblesTable
                            tareas={tareas}
                            assigning={assigning}
                            onAutoAsignar={handleAutoAsignar}
                            onVerProceso={handleVerProceso}
                        />

                        <div className="pagination">
                            <button
                                className="btn btn-secondary"
                                disabled={currentPage <= 1}
                                onClick={() => changePage(page - 1)}
                            >
                                <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                                Anterior
                            </button>

                            <span className="page-info">
                                Página {currentPage} de {lastPage} — Total: {total}
                            </span>

                            <button
                                className="btn btn-secondary"
                                disabled={currentPage >= lastPage}
                                onClick={() => changePage(page + 1)}
                            >
                                Siguiente
                                <Icons.ArrowRight size={12} />
                            </button>

                            <Link className="btn btn-secondary" to="/homeOperario">
                                <Icons.Close size={12} />
                                Volver
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}