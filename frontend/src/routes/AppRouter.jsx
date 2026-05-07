import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from '../pages/auth/RegisterPage';
import { authStore } from '../stores/auth';
import LandingPage from '../pages/auth/LandingPage';
import { PublicGuard } from './guards/PublicGuard';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/admins/HomePage';
import ProtectedRoute from './guards/ProtectedRoute';
import AppLayout from '../layout/AppLayout';
import { RoleRedirect } from './guards/RoleRedirect';
import AuthLayout from '../layout/AuthLayout';
import EmpleadoFormPage from '../pages/admins/EmpleadosFormPage';
import ViewEmpleadosPage from '../pages/admins/ViewEmpleadosPage';
import UpdateEmpleadoFormPage from '../pages/admins/UpdateEmpleadoFormPage';
import { ViewEmpleadoDetailPage } from '../pages/admins/VieEmpleadoDetailPage';
import PuestosTrabajoFormPage from '../pages/admins/puestosTrabajo/PuestosTrabajoFormPage';
import ModeloHomePage from '../pages/modelo/ModeloHomePage';
import ModelosFormPage from '../pages/modelo/ModeloFormPage';
import ModeloViewPage from '../pages/modelo/ModeloViewPage';
import CrearProcesoFabricacionPage from '../pages/procesoDeFabricacion/ProcesoFabricacionFormPage';
import { GenerarOrdenesPage } from '../pages/admins/produccion/GenerarOrdenesPage';
import ProduccionHomePage from '../pages/admins/produccion/ProduccionHomePage';
import { CrearOrdenProduccionPage } from '../pages/admins/produccion/CrearOrdenProduccionPage';
import { TareasProduccionPage } from '../pages/admins/produccion/TareasProduccionPage';
import { AsignarTareaProduccionPage } from '../pages/admins/produccion/AsignarTareaProduccionPage';
import { AsignarPuestoTrabajoPage } from '../pages/admins/puestosTrabajo/AsignarPuestoTrabajoPage';
import PuestosTrabajoHomePage from '../pages/admins/puestosTrabajo/PuestosTrabajoHomePage';
import OperarioHomePage from '../pages/operario/OperarioHomePage';
import { TareasDisponiblesPage } from '../pages/operario/TareasDisponiblesPage';


export default function AppRouter() {
    const empleado = authStore((state)=>state.empleado)
    const token = authStore((state)=>state.token)
    
  return (
      <BrowserRouter>
  <Routes>

    {/* Rutas públicas */}
     <Route element={<PublicGuard />}>
      <Route element={<AuthLayout />}>
        <Route path="/inicio" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Route>

    {/* Rutas privadas */}
    <Route element={<ProtectedRoute/>}>
      <Route element={<AppLayout/>}>

        <Route path="/" element={<RoleRedirect/>} />

        //Rutas de usuarios

    <Route element={<RoleRedirect allowedRoles={["administrador"]} />}>
    <Route path="/homeAdmin" element={<HomePage/>} />
    <Route path="/empleado/form" element={<EmpleadoFormPage />} />
    <Route path="/empleado/view" element={<ViewEmpleadosPage />} />
    <Route path="/empleados/:id/editar" element={<UpdateEmpleadoFormPage />} />
    <Route path="/empleados/:id/detail" element={<ViewEmpleadoDetailPage />} />
</Route>

{/* Rutas gestor */}
<Route element={<RoleRedirect allowedRoles={["gestor"]} />}>
    {/* <Route path="/homeGestor" element={<GestorHomePage />} /> */}
    {/* aquí metes las rutas propias del gestor */}
</Route>

{/* Rutas compartidas admin + gestor */}
<Route element={<RoleRedirect allowedRoles={["administrador", "gestor"]} />}>
    <Route path="/puestosTrabajoForm" element={<PuestosTrabajoFormPage />} />
    <Route path="/AsignarPuestoDeTrabajo" element={<AsignarPuestoTrabajoPage />} />
    <Route path="/PuestosTrabajoHome" element={<PuestosTrabajoHomePage />} />

    <Route path="/modelos/create" element={<ModelosFormPage />} />
    <Route path="/modelos/home" element={<ModeloHomePage />} />
    <Route path="/modelos/view" element={<ModeloViewPage />} />

    <Route path="/procesoFabricacion/:modeloId/create" element={<CrearProcesoFabricacionPage/>} />

    <Route path="/produccion/home" element={<ProduccionHomePage />} />
    <Route path="/produccion/generar-ordenes" element={<GenerarOrdenesPage />} />
    <Route path="/produccion/modelos/:modeloId/generar-orden" element={<CrearOrdenProduccionPage />} />
    <Route path="/produccion/asignar-tareas/generar-ordenes" element={<TareasProduccionPage />} />
    <Route path="/produccion/tareas/:tareaId/asignar/:puestoTrabajoId" element={<AsignarTareaProduccionPage />} />
</Route>

{/* Rutas operario */}
<Route element={<RoleRedirect allowedRoles={["operario"]} />}>
    <Route path="/homeOperario" element={<OperarioHomePage />} />
    <Route path="/operario/tareas-disponibles" element={<TareasDisponiblesPage />} />
</Route>



      </Route>
    </Route>
  </Routes>
</BrowserRouter>
  )
}
