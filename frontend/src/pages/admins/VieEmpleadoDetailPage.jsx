// src/pages/admins/ViewEmpleadoDetailPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import Icons from "../../utils/icons";
import { useEmpleadoShow } from "../../hooks/empleados/useEmpleadoShow";

export const ViewEmpleadoDetailPage = () => {
    const { id } = useParams();
    const { empleado, loading, error } = useEmpleadoShow(id);
    const navigate = useNavigate();

    if (loading) {
        return (
            <section className="page">
                <div className="loading-message">
                    <Icons.Info size={24} />
                    <p>Cargando empleado...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page">
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>{error}</span>
                </div>
                <div className="page-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/empleado/view")}
                    >
                        <Icons.Close size={12} />
                        Volver
                    </button>
                </div>
            </section>
        );
    }

    if (!empleado) {
        return (
            <section className="page">
                <div className="form-alert form-alert-error">
                    <Icons.Alert size={18} />
                    <span>No se encontró el empleado.</span>
                </div>
                <div className="page-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/empleados")}
                    >
                        <Icons.Close size={12} />
                        Volver
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="page">
            <div className="page-header">
                <div>
                    <h1>Detalle del trabajador</h1>
                    <p>Consulta la información completa del empleado.</p>
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

            <div className="employee-profile-card">
                <div className="employee-profile-header">
                    <div className="employee-identity">
                        <div className="employee-avatar">
                            {empleado.nombre?.charAt(0)}
                            {empleado.apellido?.charAt(0)}
                        </div>

                        <div className="employee-title">
                            <h2>{empleado.nombre} {empleado.apellido}</h2>
                            <p>@{empleado.usuario}</p>
                            <span className={empleado.activo ? "status status-active" : "status status-inactive"}>
                                <span className="status-dot"></span>
                                {empleado.activo ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="employee-info-grid">
                    <div className="info-box">
                        <Icons.Role size={18} />
                        <div>
                            <span>Rol </span>
                            <strong>{empleado.rol === 'administrador' ? 'Administrador' : 
                                     empleado.rol === 'gestor' ? 'Gestor' : 'Operario'}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Email size={18} />
                        <div>
                            <span>Email </span>
                            <strong>{empleado.email || "No registrado"}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Phone size={18} />
                        <div>
                            <span>Teléfono </span>
                            <strong>{empleado.telefono || "No registrado"}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Id size={18} />
                        <div>
                            <span>DNI </span>
                            <strong>{empleado.dni || "No registrado"}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Contract size={18} />
                        <div>
                            <span>Tipo contrato </span>
                            <strong>{empleado.tipo_contrato === 'destajo' ? 'Por destajo' : 'Por horas'}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Money size={18} />
                        <div>
                            <span>Precio hora </span>
                            <strong>{empleado.precio_hora ? `$${empleado.precio_hora}` : "No aplica"}</strong>
                        </div>
                    </div>

                    <div className="info-box highlight">
                        <Icons.Payments size={18} />
                        <div>
                            <span>Saldo pendiente </span>
                            <strong>${empleado.saldo_pendiente?.toLocaleString() || 0}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Users size={18} />
                        <div>
                            <span>Empresa </span>
                            <strong>{empleado.empresa?.nombre || "Sin empresa"}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Positions size={18} />
                        <div>
                            <span>Puesto de trabajo </span>
                            <strong>{empleado.puesto_trabajo?.nombre || "No asignado"}</strong>
                        </div>
                    </div>

                    <div className="info-box">
                        <Icons.Calendar size={18} />
                        <div>
                            <span>Fecha de creación </span>
                            <strong>
                                {empleado.created_at 
                                    ? new Date(empleado.created_at).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                      })
                                    : "No disponible"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="employee-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/empleados/${empleado.id}/editar`)}
                    >
                        <Icons.Edit size={14} />
                        Editar empleado
                    </button>

                    <button
                        className={empleado.activo ? "btn btn-danger" : "btn btn-success"}
                    >
                        {empleado.activo ? "Dar de baja" : "Activar"}
                    </button>

                    <button
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
};