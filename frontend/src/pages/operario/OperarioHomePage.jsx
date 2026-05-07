import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/common/LogoutButton'

export default function OperarioHomePage() {
  return (
    <div>
            <LogoutButton/>
        
        <Link to={'/Operario/tareas-disponibles'}>
            Tareas disponibles
        </Link>
    </div>
  )
}
