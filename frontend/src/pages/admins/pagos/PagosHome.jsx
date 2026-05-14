import React from "react";
import { Link } from "react-router-dom";
import { usePagosEstadisticas } from "../../../hooks/estadisticas/usePagosEstadistias";


export default function PagosHome() {
  const { estadisticas, loading, error } = usePagosEstadisticas();

  const formatearDinero = (valor) => {
    return Number(valor || 0).toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin pagos";

    return new Date(fecha).toLocaleDateString("es-ES");
  };

  return (
    <div className="page pagos-page">
      <div className="page-header pagos-header">
        <div>
          <h1>Gestión de pagos</h1>
          <p>
            Controla los saldos pendientes, nóminas pagadas y pagos realizados
            a empleados del taller.
          </p>
        </div>
      </div>

      {loading && (
        <div className="card">
          <p>Cargando estadísticas de pagos...</p>
        </div>
      )}

      {error && (
        <div className="form-alert form-alert-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="pagos-stats-grid">
            <div className="card pago-stat-card">
              <span className="pago-stat-icon">💰</span>
              <p className="pago-stat-label">Total pendiente</p>
              <h2>{formatearDinero(estadisticas?.total_pendiente)}</h2>
              <small>Dinero pendiente por pagar a empleados.</small>
            </div>

            <div className="card pago-stat-card">
              <span className="pago-stat-icon">📅</span>
              <p className="pago-stat-label">Pagado este mes</p>
              <h2>{formatearDinero(estadisticas?.pagado_mes_actual)}</h2>
              <small>Total abonado durante el mes actual.</small>
            </div>

            <div className="card pago-stat-card">
              <span className="pago-stat-icon">👷</span>
              <p className="pago-stat-label">Empleados pendientes</p>
              <h2>{estadisticas?.empleados_con_saldo_pendiente || 0}</h2>
              <small>Empleados con saldo pendiente acumulado.</small>
            </div>

            <div className="card pago-stat-card">
              <span className="pago-stat-icon">🧾</span>
              <p className="pago-stat-label">Último pago</p>
              <h2>{formatearFecha(estadisticas?.ultimo_pago?.fecha_pago)}</h2>
              <small>
                {estadisticas?.ultimo_pago
                  ? `${estadisticas.ultimo_pago.empleado} · ${formatearDinero(
                      estadisticas.ultimo_pago.monto_pagado
                    )}`
                  : "Todavía no hay pagos registrados."}
              </small>
            </div>
          </div>

          <div className="pagos-actions-section">
            <h2>Acciones rápidas</h2>

            <div className="pagos-actions-grid">
              <div className="card pagos-action-card">
                <h3>Empleados pendientes de pago</h3>
                <p>
                  Consulta qué empleados tienen saldo pendiente por tareas,
                  jornadas o destajo.
                </p>

                <Link className="btn btn-primary" to="/empleados/pendientes-pago">
                  Ver pendientes
                </Link>
              </div>

              <div className="card pagos-action-card">
                <h3>Nóminas pagadas</h3>
                <p>
                  Revisa el historial de pagos registrados, fechas, métodos y
                  montos abonados.
                </p>

                <Link className="btn btn-secondary" to="/empleados/pagos-empleados">
                  Ver nóminas pagadas
                </Link>
              </div>

              <div className="card pagos-action-card pagos-disabled-card">
                <h3>Reportes financieros</h3>
                <p>
                  Próximamente podrás ver gastos mensuales, deuda acumulada y
                  productividad económica.
                </p>

                <button className="btn btn-secondary" disabled>
                  Próximamente
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
