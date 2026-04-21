import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    
    <div>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        <h1>Tapiz.Net</h1>
        
    </div>
  )
}
