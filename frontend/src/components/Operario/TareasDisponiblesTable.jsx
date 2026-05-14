export function TareasDisponiblesTable({
    tareas,
    assigning,
    onAutoAsignar,
}) {
    if (!tareas || tareas.length === 0) {
        return (
            <div className="form-alert">
                No tienes tareas disponibles para tu puesto de trabajo.
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Unidad</th>
                        <th>Tarea</th>
                        <th>Puesto</th>
                        <th>Prioridad</th>
                        <th>Precio destajo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea.id}>
                            <td>
                                {tarea.orden_produccion?.codigo || "Sin orden"}
                            </td>

                            <td>
                                {tarea.unidad_fabricacion?.numero_unidad
                                    ? `Unidad ${tarea.unidad_fabricacion.numero_unidad}`
                                    : "Sin unidad"}
                            </td>

                            <td>
                                <strong>{tarea.nombre_tarea}</strong>
                                {tarea.descripcion && (
                                    <p>{tarea.descripcion}</p>
                                )}
                            </td>

                            <td>
                                {tarea.puesto_trabajo?.nombre || "Sin puesto"}
                            </td>

                            <td>
                                {tarea.orden_produccion?.prioridad || "Normal"}
                            </td>

                            <td>
                                {tarea.ganancia_destajo
                                    ? `${tarea.ganancia_destajo} €`
                                    : "0 €"}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={assigning}
                                    onClick={() => onAutoAsignar(tarea.id)}
                                >
                                    {assigning ? "Asignando..." : "Asignarme"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}