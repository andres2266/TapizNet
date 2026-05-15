// src/components/Operario/TareasDisponiblesTable.jsx
import React from "react";
import Icons from "../../utils/icons";

export function TareasDisponiblesTable({ tareas, assigning, onAutoAsignar, onVerProceso }) {
    if (tareas.length === 0) {
        return (
            <div className="empty-state" style={{ textAlign: 'center', padding: '3rem' }}>
                <Icons.Info size={48} />
                <p>No hay tareas disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Orden</th>
                        <th>Unidad</th>
                        <th>Puesto</th>
                        <th>Prioridad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => (
                        <tr key={tarea.id}>
                            <td className="tarea-nombre">
                                <strong>{tarea.nombre_tarea}</strong>
                            </td>
                            <td>
                                <span className="badge-muted">
                                    <Icons.Box size={10} />
                                    {tarea.orden_produccion?.codigo || "Sin orden"}
                                </span>
                            </td>
                            <td>
                                {tarea.unidad_fabricacion?.numero_unidad
                                    ? `Unidad ${tarea.unidad_fabricacion.numero_unidad}`
                                    : "Sin unidad"}
                            </td>
                            <td>
                                <span className="badge-muted">
                                    <Icons.Role size={10} />
                                    {tarea.puesto_trabajo?.nombre || "Sin puesto"}
                                </span>
                            </td>
                            <td>
                                <span className={`badge-muted priority-${tarea.orden_produccion?.prioridad || 'normal'}`}>
                                    {tarea.orden_produccion?.prioridad || "Normal"}
                                </span>
                            </td>
                            <td className="precio-cell">
                                <Icons.Money size={12} />
                                {Number(tarea.ganancia_destajo || 0).toFixed(2)} €
                            </td>
                            <td className="table-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => onVerProceso(tarea.id)}
                                    title="Ver proceso de fabricación"
                                >
                                    <Icons.Info size={12} />
                                    Ver proceso
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => onAutoAsignar(tarea.id)}
                                    disabled={assigning === tarea.id}
                                >
                                    <Icons.UserSingle size={12} />
                                    {assigning === tarea.id ? "Asignando..." : "Autoasignar"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}