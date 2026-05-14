import React from 'react'
import { authStore } from '../../stores/auth'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/common/LogoutButton'
import LinksHomeAdmind from '../../components/links/LinksHomeAdmind'
import  Icons   from '../../utils/icons.jsx'
export default function HomePage() {
    const user = authStore((state)=>state.empleado)

     const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

  return (
     <div className="home-container">
            {/* Banner de bienvenida */}
            <div className="welcome-banner">
                <div className="welcome-text">
                    <h3>¡Bienvenido, Administrador!</h3>
                    <p>Gestiona tu tapicería de forma eficiente y organizada</p>
                </div>
                <div className="welcome-date">
                    <Icons.Calendar />
                    <span>{formattedDate}</span>
                </div>
            </div>

            {/* Header */}
            <div className="home-header">
                <h1>Panel de Control</h1>
                <p>Selecciona una opción para comenzar a gestionar tu taller</p>
            </div>
            {/* Grid de tarjetas con tus Links normales */}
            <div className="home-menu">
                <div className="home-grid">
                    <Link to="/empleado/form" className="home-card">
                        <div className="home-card-icon"><Icons.Users /></div>
                        <h3 className="home-card-title">Dar de alta trabajador</h3>
                        <p className="home-card-description">Registra nuevos empleados en el sistema con sus datos y rol</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>

                    <Link to="/empleado/view" className="home-card">
                        <div className="home-card-icon"><Icons.ViewUsers /></div>
                        <h3 className="home-card-title">Ver usuarios</h3>
                        <p className="home-card-description">Consulta, edita y gestiona todos los trabajadores del taller</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>

                    <Link to="/PuestosTrabajoHome" className="home-card">
                        <div className="home-card-icon"><Icons.Positions /></div>
                        <h3 className="home-card-title">Puestos de trabajo</h3>
                        <p className="home-card-description">Administra los diferentes roles y posiciones en la tapicería</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>

                    <Link to="/modelos/home" className="home-card">
                        <div className="home-card-icon"><Icons.Models /></div>
                        <h3 className="home-card-title">Modelos</h3>
                        <p className="home-card-description">Gestiona los modelos de productos y sus especificaciones</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>

                    <Link to="/produccion/home" className="home-card">
                        <div className="home-card-icon"><Icons.Orders /></div>
                        <h3 className="home-card-title">Órdenes de pedido</h3>
                        <p className="home-card-description">Controla la producción, seguimiento y estado de pedidos</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>

                    <Link to="/pagos/home" className="home-card">
                        <div className="home-card-icon"><Icons.Payments /></div>
                        <h3 className="home-card-title">Pagos de nóminas</h3>
                        <p className="home-card-description">Administra salarios, pagos pendientes y reportes financieros</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
