// src/pages/auth/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Icons from '../../utils/icons'
import logoDeTagma from '../../assets/logoDeTagma.png'

export default function LandingPage() {
    return (
        <section className="landing-page">
            <div className="landing-card">
                <div className="landing-brand">
                    <div className="landing-logo">
                        <img src={logoDeTagma} alt="Tagma Logo" className="logo-image" />
                    </div>
                    <h1>Tagma</h1>
                    <p>Gestión inteligente para talleres de tapicería y muebles.</p>
                </div>

                <div className="landing-features">
                    <div className="feature-item">
                        <Icons.Users size={20} />
                        <span>Gestión de empleados</span>
                    </div>
                    <div className="feature-item">
                        <Icons.Orders size={20} />
                        <span>Control de producción</span>
                    </div>
                    <div className="feature-item">
                        <Icons.Payments size={20} />
                        <span>Pagos y nóminas</span>
                    </div>
                    <div className="feature-item">
                        <Icons.Models size={20} />
                        <span>Modelos y procesos</span>
                    </div>
                </div>

                <div className="landing-actions">
                    <Link to="/register" className="btn-landing btn-primary">
                        <Icons.Plus size={16} />
                        Registrarse
                    </Link>
                    <Link to="/login" className="btn-landing btn-secondary">
                        <Icons.ArrowRight size={16} />
                        Iniciar sesión
                    </Link>
                </div>

                <p className="landing-footer">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </section>
    )
}