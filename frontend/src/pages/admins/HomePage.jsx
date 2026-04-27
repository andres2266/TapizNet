import React from 'react'
import { authStore } from '../../stores/auth'
import { Link } from 'react-router-dom'
export default function HomePage() {
    const user = authStore((state)=>state.empleado)
  return (
    <>
        <p>Bienvenido {user?.nombre}</p>

        <div>
           <Link to="/empleado/form">
               Dar de alta trabajador 
            </Link>

             <Link to="/empleado/view">
                Ver usuarios
            </Link>
            
        </div>
    </>
  )
}
