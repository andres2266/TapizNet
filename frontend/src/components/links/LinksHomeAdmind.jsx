import React from 'react'
import { Link } from 'react-router-dom'

export default function LinksHomeAdmind() {
  return (
    <div>
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

    <Link to='/pagos/home'  className="home-card">
        Opciones de pago de nominas
    </Link>
    </div>
  )
}
