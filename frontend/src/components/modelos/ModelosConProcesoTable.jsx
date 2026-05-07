export function ModelosConProcesoTable({ modelos, onGenerarOrden }) {
    return (
        <div className="card">
            <table className="employee-form">
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
                            <td>{modelo.nombre}</td>

                            <td>
                                <span className="form-alert form-alert-success">
                                    Configurado
                                </span>
                            </td>

                            <td>
                                {modelo.procesos_fabricacion_count ?? 0}
                            </td>

                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => onGenerarOrden(modelo)}
                                >
                                    Generar orden
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}