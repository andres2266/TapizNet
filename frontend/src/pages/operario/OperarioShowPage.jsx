// src/pages/operario/OperarioShowPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import Icons from "../../utils/icons";
import { useEmpleadoShow } from "../../hooks/empleados/useEmpleadoShow";

export default function OperarioShowPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { empleado, loading, error } = useEmpleadoShow(id);

    const empleadoData = empleado?.empleado || empleado;

    if (loading) {
        return (
            <section className="page">
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando información del empleado...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page">
                <div className="page-header">
                    <div>
                        <h1>Detalle del empleado</h1>
                        <p>No se pudo cargar la información del empleado.</p>
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
                    <div className="form-alert form-alert-error">
                        <Icons.Alert size={18} />
                        <span>{error}</span>
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
                </div>
            </section>
        );
    }

    if (!empleadoData) {
        return (
            <section className="page">
                <div className="page-header">
                    <div>
                        <h1>Detalle del empleado</h1>
                        <p>No se encontró información del empleado.</p>
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
                    <div className="empty-state">
                        <Icons.Info size={48} />
                        <p>No se encontró información del empleado.</p>
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
                </div>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>
                        {empleadoData.nombre} {empleadoData.apellido || ""}
                    </h1>
                    <p>Información general del empleado.</p>
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

            {/* Datos personales */}
            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-icon">
                        <Icons.UserSingle size={32} />
                    </div>
                    <div className="detail-title">
                        <h2>Datos personales</h2>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.UserSingle size={14} />
                            Nombre
                        </div>
                        <div className="detail-value">
                            {empleadoData.nombre || "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.UserSingle size={14} />
                            Apellido
                        </div>
                        <div className="detail-value">
                            {empleadoData.apellido || "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.UserSingle size={14} />
                            Usuario
                        </div>
                        <div className="detail-value">
                            @{empleadoData.usuario || "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Email size={14} />
                            Email
                        </div>
                        <div className="detail-value">
                            {empleadoData.email || "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Phone size={14} />
                            Teléfono
                        </div>
                        <div className="detail-value">
                            {empleadoData.telefono || "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Id size={14} />
                            DNI
                        </div>
                        <div className="detail-value">
                            {empleadoData.dni || "No definido"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Información laboral */}
            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-icon">
                        <Icons.Role size={32} />
                    </div>
                    <div className="detail-title">
                        <h2>Información laboral</h2>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Role size={14} />
                            Rol
                        </div>
                        <div className="detail-value">
                            <span className="role-badge">
                                {empleadoData.rol === 'administrador' && 'Administrador'}
                                {empleadoData.rol === 'gestor' && 'Gestor'}
                                {empleadoData.rol === 'operario' && 'Operario'}
                                {!empleadoData.rol && "No definido"}
                            </span>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Contract size={14} />
                            Tipo de contrato
                        </div>
                        <div className="detail-value">
                            {empleadoData.tipo_contrato === 'destajo' ? 'Por destajo' : 
                             empleadoData.tipo_contrato === 'horas' ? 'Por horas' : 
                             "No definido"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Positions size={14} />
                            Puesto de trabajo
                        </div>
                        <div className="detail-value">
                            {empleadoData.puesto_trabajo?.nombre ||
                                empleadoData.puestoTrabajo?.nombre ||
                                "No asignado"}
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Money size={14} />
                            Precio hora
                        </div>
                        <div className="detail-value">
                            {empleadoData.precio_hora
                                ? `${Number(empleadoData.precio_hora).toFixed(2)} €`
                                : "No definido"}
                        </div>
                    </div>

                    <div className="detail-item highlight">
                        <div className="detail-label">
                            <Icons.Payments size={14} />
                            Saldo pendiente
                        </div>
                        <div className="detail-value">
                            {Number(empleadoData.saldo_pendiente || 0).toFixed(2)} €
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Check size={14} />
                            Estado
                        </div>
                        <div className="detail-value">
                            <span className={empleadoData.activo ? "status-active" : "status-inactive"}>
                                <span className="status-dot"></span>
                                {empleadoData.activo ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                    </div>

                    <div className="detail-item">
                        <div className="detail-label">
                            <Icons.Calendar size={14} />
                            Fecha de creación
                        </div>
                        <div className="detail-value">
                            {empleadoData.created_at
                                ? new Date(empleadoData.created_at).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                  })
                                : "No disponible"}
                        </div>
                    </div>
                </div>
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
        </section>
    );
}