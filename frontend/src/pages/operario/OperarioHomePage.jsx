import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/common/LogoutButton'
import { JornadaLaboralButton } from '../../components/common/JornadaLaboralButton'

export default function OperarioHomePage() {
  return (
    <div>
        <LogoutButton/>

        <JornadaLaboralButton/>
        
        <Link to={'/Operario/tareas-disponibles'}>
            Tareas disponibles
        </Link>
    </div>
  )
}
