import React from 'react';
import { Outlet } from "react-router-dom";
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

export default function AppLayout() {
  return (
    <div className="app-layout">
     
      <header className="main-header">
        <div className="header-container">
          <div className="header-brand">
            <span>TG</span>
            <h2>Tagma</h2>
          </div>
          <div className="header-actions">
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