// src/pages/operario/HomePageOperario.jsx
import React from 'react'
import { authStore } from '../../stores/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import LogoutButton from '../../components/common/LogoutButton.jsx'

import Icons from '../../utils/icons.jsx'
import { JornadaLaboralButton } from '../../components/common/JornadaLaboralButton.jsx'

export default function HomePageOperario() {
    const navigate = useNavigate();
    const user = authStore((state) => state.empleado)

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
                    <h3>¡Bienvenido, Operario! {user?.nombre}</h3>
                    <p>Gestiona tus tareas y jornada laboral de forma eficiente</p>
                </div>
                <div className="welcome-date">
                    <Icons.Calendar size={14} />
                    <span>{formattedDate}</span>
                </div>
            </div>

            {/* Header */}
            <div className="home-header">
                <h1>Panel de Control - Operario</h1>
                <p>Selecciona una opción para gestionar tu trabajo diario</p>
            </div>

            {/* Grid de tarjetas */}
            <div className="home-menu">
                <div className="home-grid">
                    {/* Tareas disponibles */}
                    <Link to="/operario/tareas-disponibles" className="home-card">
                        <div className="home-card-icon"><Icons.Orders size={24} /></div>
                        <h3 className="home-card-title">Tareas disponibles</h3>
                        <p className="home-card-description">Consulta y selecciona las tareas asignadas a tu puesto</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight size={14} />
                        </div>
                    </Link>
                      
                    {/* Ver perfil */}
                    <Link to={`/operario/${user.id}/show`} className="home-card">
                        <div className="home-card-icon"><Icons.UserSingle size={24} /></div>
                        <h3 className="home-card-title">Ver perfil</h3>
                        <p className="home-card-description">Consulta tus datos personales y de contratación</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight size={14} />
                        </div>
                    </Link>
                

                     <Link to="/operario/mi-tarea-actual" className="home-card">
                        <div className="home-card-icon"><Icons.Orders size={24} /></div>
                        <h3 className="home-card-title">Ver mi tarea Actual</h3>
                        <p className="home-card-description">Consulta tus datos personales y de contratación</p>
                        <div className="home-card-arrow">
                            <span>Acceder</span>
                            <Icons.ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Acciones inferiores */}
            <div className="operario-actions-footer">
                {user?.tipo_contrato === 'horas' &&<JornadaLaboralButton/> }
                
                

                <LogoutButton />
            </div>
        </div>
    )
}