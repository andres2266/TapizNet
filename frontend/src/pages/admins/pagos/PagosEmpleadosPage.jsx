import { useNavigate } from "react-router-dom";
import { usePagosEmpleadosPendientes } from "../../../hooks/pagos/usePagosEmpleadosPendientes";

export function PagosEmpleadosPage() {
    const navigate = useNavigate();

    const {
        empleados,
        loading,
        error,
        recargarEmpleadosPendientes,
    } = usePagosEmpleadosPendientes();

    const handleCancel = () => {
        navigate("/pagos/home");
    };

    const handlePagar = (empleadoId) => {
        navigate(`/empleados/pagos-empleados/${empleadoId}/registrar`);
    };

    const handleVerDetalle = (empleadoId) => {
        navigate(`/empleados/${empleadoId}/detail`);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Pagos pendientes</h1>

                    <p>
                        Empleados con saldo pendiente por pagar.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={recargarEmpleadosPendientes}
                >
                    Recargar
                </button>


            </div>

            {loading && (
                <div className="card">
                    <p>Cargando empleados pendientes...</p>
                </div>
            )}

            {error && (
                <p className="form-alert form-alert-error">
                    {error}
                </p>
            )}

            {!loading && !error && empleados.length === 0 && (
                <div className="card">
                    <p>
                        No hay empleados con saldo pendiente.
                    </p>
                </div>
            )}

            {!loading && !error && empleados.length > 0 && (
                <div className="card">

                    <table className="employees-table">
                        <thead>
                            <tr>
                                <th>Empleado</th>
                                <th>Usuario</th>
                                <th>Puesto</th>
                                <th>Contrato</th>
                                <th>Saldo pendiente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {empleados.map((empleado) => (
                                <tr key={empleado.id}>
                                    <td>
                                        {empleado.nombre}{" "}
                                        {empleado.apellido || ""}
                                    </td>

                                    <td>
                                        {empleado.usuario}
                                    </td>

                                    <td>
                                        {empleado.puesto_trabajo?.nombre ||
                                            "Sin puesto"}
                                    </td>

                                    <td>
                                        {empleado.tipo_contrato}
                                    </td>

                                    <td>
                                        {Number(
                                            empleado.saldo_pendiente
                                        ).toFixed(2)} €
                                    </td>

                                    <td className="page-actions">

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                handleVerDetalle(
                                                    empleado.id
                                                )
                                            }
                                        >
                                            Ver detalle
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                handlePagar(
                                                    empleado.id
                                                )
                                            }
                                        >
                                            Registrar pago
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Volver
                    </button>
                </div>
            )}
        </div>
    );
}