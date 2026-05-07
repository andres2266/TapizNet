import React from 'react'
import { Link } from 'react-router-dom'

export default function ProduccionHomePage() {
    return (
        <div>
            <Link to={'/produccion/generar-ordenes'}>
                Generar ordenes de produccion
            </Link>

             <Link to={'/produccion/asignar-tareas/generar-ordenes'}>
                Asignacion de tareas
            </Link>
        </div>
    )
}
