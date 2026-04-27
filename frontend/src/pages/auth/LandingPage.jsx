import React from 'react'
import { Link } from 'react-router-dom'
import { authStore } from '../../stores/auth'

export default function LandingPage() {

  return (
    
  <section className="auth-page">
            <div className="auth-card auth-card-small">
                <div className="auth-brand">
                    <span className="auth-logo">TN</span>
                    <h1>TapizNet</h1>
                    <p>Gestión inteligente para talleres de tapicería y muebles.</p>
                </div>

                <div className="auth-actions">
                    <Link to="/register" className="btn-auth btn-primary">
                        Registrarse
                    </Link>

                    <Link to="/login" className="btn-auth btn-secondary">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </section>
  )
}
