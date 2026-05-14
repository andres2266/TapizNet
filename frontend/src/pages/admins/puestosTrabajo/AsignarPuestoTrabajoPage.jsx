import { useNavigate } from "react-router-dom";
import { useAsignarPuestoTrabajo } from "../../../hooks/puestoTrabajo/useAsignarPuestoTrabajo";

export function AsignarPuestoTrabajoPage() {
    const navigate = useNavigate();

    const {
        empleados,
        puestosTrabajo,
        loading,
        assigning,
        error,
        successMessage,
        search,
        page,
        lastPage,
        selectedPuestos,
        dispatch,
        asignarPuesto,
    } = useAsignarPuestoTrabajo();

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Asignar puestos de trabajo</h1>
                    <p>Selecciona un puesto para empleados que todavía no tienen uno asignado.</p>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/PuestosTrabajoHome")}
                >
                    Volver
                </button>
            </div>

            <section className="card">
                <div className="filters">
                    <div className="form-group">
                        <label>Buscar empleado</label>
                        <input
                            type="text"
                            value={search}
                            placeholder="Nombre, apellido o usuario"
                            onChange={(e) =>
                                dispatch({
                                    type: "SET_FILTER",
                                    field: "search",
                                    value: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </section>

            {error && (
                <div className="form-alert form-alert-error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="form-alert form-alert-success">
                    {successMessage}
                </div>
            )}

            {loading && <p>Cargando empleados sin puesto de trabajo...</p>}

            {!loading && !error && empleados.length === 0 && (
                <section className="card">
                    <p>No hay empleados pendientes por asignar puesto de trabajo.</p>
                </section>
            )}

            {!loading && !error && empleados.length > 0 && (
                <section className="card">
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Empleado</th>
                                    <th>Usuario</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Puesto de trabajo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {empleados.map((empleado) => (
                                    <tr key={empleado.id}>
                                        <td>
                                            <strong>
                                                {empleado.nombre}{" "}
                                                {empleado.apellido || ""}
                                            </strong>
                                        </td>

                                        <td>{empleado.usuario}</td>

                                        <td>{empleado.rol}</td>

                                        <td>
                                            <span
                                                className={
                                                    empleado.activo
                                                        ? "status status-active"
                                                        : "status status-inactive"
                                                }>
                                                <span className="status-dot"></span>
                                                {empleado.activo
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="form-group">
                                                <select
                                                    value={
                                                        selectedPuestos[empleado.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        dispatch({
                                                            type: "SET_PUESTO_EMPLEADO",
                                                            empleadoId: empleado.id,
                                                            puestoTrabajoId:
                                                                e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">
                                                        Selecciona un puesto
                                                    </option>

                                                    {puestosTrabajo.map((puesto) => (
                                                        <option
                                                            key={puesto.id}
                                                            value={puesto.id}
                                                        >
                                                            {puesto.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </td>

                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    disabled={
                                                        assigning ||
                                                        !selectedPuestos[
                                                        empleado.id
                                                        ]
                                                    }
                                                    onClick={() =>
                                                        asignarPuesto(
                                                            empleado.id
                                                        )}>
                                                    {assigning
                                                        ? "Asignando..."
                                                        : "Asignar"}
                                                </button>
                                            </div>
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
                            Anterior
                        </button>

                        <span>
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
                        </button>
                    </div>
                </section>
            )}</main>
    );
}