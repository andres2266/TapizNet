import { useNavigate,Link, useParams } from "react-router-dom";
import { useEmpleadoShow } from "../../hooks/empleados/useEmpleadoShow";

export const ViewEmpleadoDetailPage = () => {
    const { id } = useParams();
    const { empleado, loading, error } = useEmpleadoShow(id);
    const navigate = useNavigate();
    if (loading) return <p>Cargando empleado...</p>;
    if (error) return <p>{error}</p>;
    if (!empleado) return <p>No se encontró el empleado.</p>;

    return (
       <section className="page">
    <div className="page-header">
        <h1>Detalle del trabajador</h1>
        <p>Consulta la información completa del empleado.</p>
    </div>

    <div className="employee-profile-card">
        <div className="employee-profile-header">
            <div className="employee-avatar">
                {empleado.nombre?.charAt(0)}
                {empleado.apellido?.charAt(0)}
            </div>

            <div className="employee-main-info">
                <h2>{empleado.nombre} {empleado.apellido}</h2>
                <p>@{empleado.usuario}</p>

                <span className={empleado.activo ? "status status-active" : "status status-inactive"}>
                    <span className="status-dot"></span>
                    {empleado.activo ? "Activo" : "Inactivo"}
                </span>
            </div>
        </div>

        <div className="employee-info-grid">
            <div className="info-box">
                <span>Rol</span>
                <strong>{empleado.rol}</strong>
            </div>

            <div className="info-box">
                <span>Email</span>
                <strong>{empleado.email || "No registrado"}</strong>
            </div>

            <div className="info-box">
                <span>Teléfono</span>
                <strong>{empleado.telefono || "No registrado"}</strong>
            </div>

            <div className="info-box">
                <span>DNI</span>
                <strong>{empleado.dni || "No registrado"}</strong>
            </div>

            <div className="info-box">
                <span>Tipo contrato</span>
                <strong>{empleado.tipo_contrato}</strong>
            </div>

            <div className="info-box">
                <span>Precio hora</span>
                <strong>{empleado.precio_hora ? `$${empleado.precio_hora}` : "No aplica"}</strong>
            </div>

            <div className="info-box highlight">
                <span>Saldo pendiente</span>
                <strong>${empleado.saldo_pendiente}</strong>
            </div>

            <div className="info-box">
                <span>Empresa</span>
                <strong>{empleado.empresa?.nombre || "Sin empresa"}</strong>
            </div>
        </div>

        <div className="page-actions">
            <button
                className="btn btn-primary"
                onClick={() => navigate(`/empleados/${empleado.id}/editar`)}
            >
                Editar empleado
            </button>

            <button
                className={empleado.activo ? "btn btn-danger" : "btn btn-success"}
            >
                {empleado.activo ? "Dar de baja" : "Activar"}
            </button>

            <button
                className="btn btn-secondary"
                onClick={() => navigate("/homeAdmin")}
            >
                Volver
            </button>
        </div>
    </div>
</section>
    );
};