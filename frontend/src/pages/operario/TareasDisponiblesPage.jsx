import { Link, useNavigate } from "react-router-dom";
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

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Tareas disponibles</h1>
                    <p>
                        Aquí puedes ver las tareas disponibles según tu puesto
                        de trabajo.
                    </p>
                </div>

                <div className="page-actions">
                <Link className="btn btn-secondary" to="/homeOperario">
                    Volver
                </Link>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate("/operario/mi-tarea-actual")}
                    >
                        Ver mi tarea actual
                    </button>
                </div>
            </div>

            <section className="card">
                {error && (
                    <div className="form-alert form-alert-error">
                        {error}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={clearMessages}
                        >
                            Cerrar
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="form-alert form-alert-success">
                        {successMessage}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={clearMessages}
                        >
                            Cerrar
                        </button>
                    </div>
                )}

                <div className="filters">
                    <div className="form-group">
                        <label htmlFor="search">Buscar tarea</label>
                        <input
                            id="search"
                            type="text"
                            name="search"
                            value={search}
                            onChange={handleFilterChange}
                            placeholder="Ej: tapizar, sofá, OP-2026..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prioridad">Prioridad</label>
                        <select
                            id="prioridad"
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
                    <div className="form-alert">
                        Cargando tareas disponibles...
                    </div>
                ) : (
                    <>
                        <TareasDisponiblesTable
                            tareas={tareas}
                            assigning={assigning}
                            onAutoAsignar={handleAutoAsignar}
                        />

                        <div className="pagination">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={currentPage <= 1}
                                onClick={() => changePage(page - 1)}
                            >
                                Anterior
                            </button>

                            <span>
                                Página {currentPage} de {lastPage} — Total:{" "}
                                {total}
                            </span>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={currentPage >= lastPage}
                                onClick={() => changePage(page + 1)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}