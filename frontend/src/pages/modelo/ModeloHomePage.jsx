import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Description placeholder
 *
 * @export
 * @returns {*} 
 */
export default function ModeloHomePage() {
  return (
    <div className="home-menu" className="home-card">
        <Link to='/modelos/create'>
            Crear modelo
        </Link>
         <Link to='/modelos/view' className="home-card">
            Ver modelos
        </Link>
    </div>
  )
}
