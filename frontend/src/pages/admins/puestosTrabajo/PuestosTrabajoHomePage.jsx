import React from 'react'
import { Link } from 'react-router-dom'

export default function PuestosTrabajoHomePage() {
  return (
    <div>
        <Link to={'/AsignarPuestoDeTrabajo'}>
            Asignar Pusto de trabajo
        </Link>

         <Link to="/puestosTrabajoForm" className="home-card">
                Crear puesto de trabajo
          </Link>

    </div>
  )
}
