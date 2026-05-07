import React from 'react'
import { authStore } from '../../stores/auth'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/common/LogoutButton'
export default function HomePage() {
    const user = authStore((state)=>state.empleado)
  return (
    <>
    <p className="home-welcome">Bienvenido {user?.nombre}</p>
    <LogoutButton/>
<div className="home-menu">
    <Link to="/empleado/form" className="home-card">
        Dar de alta trabajador
    </Link>

    <Link to="/empleado/view" className="home-card">
        Ver usuarios
    </Link>

    <Link to="/PuestosTrabajoHome" className="home-card">
        Opciones Puestos de trabajo
    </Link>

    <Link to="/modelos/home" className="home-card">
        Opciones de Modelo
    </Link>

    <Link to="/produccion/home" className="home-card">
        Opciones de ordenes de pedidos
    </Link>
</div>

    </>
  )
}
