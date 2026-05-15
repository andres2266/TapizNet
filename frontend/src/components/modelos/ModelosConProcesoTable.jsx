// src/components/modelos/ModelosConProcesoTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../utils/icons";

export function ModelosConProcesoTable({ modelos, onGenerarOrden }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="modelos-table-container">
                <table className="modelos-table">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Proceso</th>
                            <th>Fases</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {modelos.map((modelo) => (
                            <tr key={modelo.id}>
                                <td className="modelo-name">
                                    <div className="modelo-name-content">
                                        <Icons.Models size={16} />
                                        <strong>{modelo.nombre}</strong>
                                    </div>
                                </td>

                                <td>
                                    <span className="badge-proceso">
                                        <Icons.Check size={12} />
                                        Configurado
                                    </span>
                                </td>

                                <td>
                                    <span className="badge-fases">
                                        <Icons.Progress size={12} />
                                        {modelo.procesos_fabricacion_count ?? 0} fases
                                    </span>
                                </td>

                                <td className="modelo-actions">
                                    <button
                                        type="button"
                                        className="btn-generar-orden"
                                        onClick={() => onGenerarOrden(modelo)}
                                    >
                                        <Icons.Plus size={14} />
                                        Generar orden
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="page-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
                    Volver
                </button>
            </div>
        </>
    );
}