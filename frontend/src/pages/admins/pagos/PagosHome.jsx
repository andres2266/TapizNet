// src/pages/admins/pagos/PagosHome.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../../utils/icons";
import { usePagosEstadisticas } from "../../../hooks/estadisticas/usePagosEstadistias";

export default function PagosHome() {
  const navigate = useNavigate();
  const { estadisticas, loading, error } = usePagosEstadisticas();

  const formatearDinero = (valor) => {
    return Number(valor || 0).toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin pagos";
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const estadisticasList = [
    {
      id: 1,
      titulo: "Total pendiente",
      valor: formatearDinero(estadisticas?.total_pendiente),
      icono: <Icons.Money size={24} />,
      color: "#d97706",
      bgColor: "#fffbeb",
      descripcion: "Dinero pendiente por pagar a empleados",
    },
    {
      id: 2,
      titulo: "Pagado este mes",
      valor: formatearDinero(estadisticas?.pagado_mes_actual),
      icono: <Icons.Calendar size={24} />,
      color: "#10b981",
      bgColor: "#ecfdf5",
      descripcion: "Total abonado durante el mes actual",
    },
    {
      id: 3,
      titulo: "Empleados pendientes",
      valor: estadisticas?.empleados_con_saldo_pendiente || 0,
      icono: <Icons.Users size={24} />,
      color: "#5b8cbe",
      bgColor: "#eef2f6",
      descripcion: "Empleados con saldo pendiente acumulado",
    },
    {
      id: 4,
      titulo: "Último pago",
      valor: formatearFecha(estadisticas?.ultimo_pago?.fecha_pago),
      icono: <Icons.Payments size={24} />,
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
      descripcion: estadisticas?.ultimo_pago
        ? `${estadisticas.ultimo_pago.empleado} · ${formatearDinero(estadisticas.ultimo_pago.monto_pagado)}`
        : "Todavía no hay pagos registrados",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Gestión de pagos</h1>
          <p>
            Controla los saldos pendientes, nóminas pagadas y pagos realizados
            a empleados del taller.
          </p>
        </div>
        <div className="page-header-date">
          <Icons.Calendar size={14} />
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {loading && (
        <div className="loading-message">
          <Icons.Info size={24} />
          <p>Cargando estadísticas de pagos...</p>
        </div>
      )}

      {error && (
        <div className="form-alert form-alert-error">
          <Icons.Alert size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="stats-grid">
            {estadisticasList.map((item) => (
              <div key={item.id} className="stats-card">
                <div className="stats-icon" style={{ backgroundColor: item.bgColor, color: item.color }}>
                  {item.icono}
                </div>
                <div className="stats-content">
                  <h3>{item.titulo}</h3>
                  <p className="stats-valor">{item.valor}</p>
                  <span className="stats-descripcion">{item.descripcion}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Acciones rápidas */}
          <div className="home-menu">
            <Link to="/empleados/pagos-empleados" className="menu-card">
              <div className="menu-card-icon">
                <Icons.Users size={28} />
              </div>
              <div className="menu-card-content">
                <h3>Empleados pendientes de pago</h3>
                <p>Consulta qué empleados tienen saldo pendiente por tareas, jornadas o destajo.</p>
              </div>
              <Icons.ArrowRight size={16} className="menu-card-arrow" />
            </Link>
          </div>
        </>
      )}

      {/* Botón de volver */}
      <div className="page-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/homeAdmin')}
        >
          <Icons.ArrowRight size={12} style={{ transform: 'rotate(180deg)' }} />
          Volver
        </button>
      </div>
    </div>
  );
}