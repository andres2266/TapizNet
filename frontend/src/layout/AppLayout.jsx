import React from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import '../styles/app.css';
import '../styles/forms.css';
import "../styles/table.css";
import '../styles/detaill.css';
import '../styles/homeAdmind.css';
import '../styles/detailsTareas.css';
import '../styles/estadisticasPago.css';
import '../styles/homeOrdenes.css'
import '../styles/homePuestosTrabajo.css'
import '../styles/viewPuestoTrabajo.css'
import '../styles/puestosTrabajoDetails.css'
import '../styles/procesoFabricacionForm.css'
import '../styles/procesosFabricacionDetail.css'
import '../styles/updateModelo.css'
import '../styles/modelosDetails.css'
import '../styles/generarOrdenDeProduccion.css'
import '../styles/modeloHome.css'
import '../styles/modeloHome.css'
import '../styles/pagosHome.css'
import '../styles/operarioHome.css'
import '../styles/tareaInstrucciones.css'
import '../styles/operarioDetails.css'
import logoDeTagma from '../assets/logoDeTagma.png'


export default function AppLayout() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/homeAdmin')
    }
  return (
        <div className="app-layout">
            <header className="main-header">
                <div className="header-container">
                    <div className="header-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <img src={logoDeTagma} alt="Tagma Logo" className="header-logo" />
                        <h2>Tagma</h2>
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
  );
}