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
import MiTareaActualPage from '../pages/operario/tareasOperario/MiTareaActualPage';
import { RegistrarPagoEmpleadoPage } from '../pages/admins/pagos/RegistrarPagosEmpleadosPage';
import { PagosEmpleadosPage } from '../pages/admins/pagos/PagosEmpleadosPage';
import PagosHome from '../pages/admins/pagos/PagosHome';
import PuestosTrabajoViewPage from '../pages/admins/puestosTrabajo/PuestosTrabajoViewPage';
import UpdatePuestoTrabajoFormPage from '../pages/admins/puestosTrabajo/UpdatePuestoTrabajoFormPage';
import { usePuestoTrabajoDetail } from '../hooks/puestoTrabajo/usePuestoTrabajoDetails';
import PuestoTrabajoDetails from '../pages/admins/puestosTrabajo/PuestoTrabajoDetails';
import EditarProcesoFabricacionPage from '../pages/procesoDeFabricacion/procesoFabricacionFormUpdatePage';
import ProcesoFabricacionDetailPage from '../pages/procesoDeFabricacion/ProcesoFabricacionDetailPage';
import ModeloUpdatePage from '../pages/modelo/ModeloUpdateFormPage';
import ModeloDetailPage from '../pages/modelo/ModeloDetailPage';
import HomePageGestor from '../pages/gestor/HomePageGestor';
import TareaInstruccionesPage from '../pages/operario/tareasOperario/TareaInstruccionesPage';
import OperarioShowPage from '../pages/operario/OperarioShowPage';



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

    <Route path='/empleados/pagos-empleados/:empleadoId/registrar' element={<RegistrarPagoEmpleadoPage/>}/>
    <Route path='/empleados/pagos-empleados' element={<PagosEmpleadosPage/>}/>
    <Route path='/pagos/home' element={<PagosHome/>}/>
</Route>

{/* Rutas gestor */}
<Route element={<RoleRedirect allowedRoles={["gestor"]} />}>
    { <Route path="/homeGestor" element={<HomePageGestor/>} /> }
</Route>

{/* Rutas compartidas admin + gestor */}
<Route element={<RoleRedirect allowedRoles={["administrador", "gestor"]} />}>
    <Route path="/puestosTrabajoForm" element={<PuestosTrabajoFormPage />} />
    <Route path="/AsignarPuestoDeTrabajo" element={<AsignarPuestoTrabajoPage />} />
    <Route path="/PuestosTrabajoHome" element={<PuestosTrabajoHomePage />} />
    <Route path="/puestosTrabajoViews"element={<PuestosTrabajoViewPage/>}/>
    <Route path='/puestosTrabajo/:id/editar' element={<UpdatePuestoTrabajoFormPage/>}/>
    <Route path='/puestosTrabajo/:id/details' element={<PuestoTrabajoDetails/>}/>

    <Route path="/modelos/create" element={<ModelosFormPage />} />
    <Route path="/modelos/home" element={<ModeloHomePage />} />
    <Route path="/modelos/view" element={<ModeloViewPage />} />
    <Route path="/modelos/:modeloId/edit" element={<ModeloUpdatePage/>} />
    <Route path="/modelos/:modeloId/show" element={<ModeloDetailPage/>} />

    <Route path="/procesoFabricacion/:modeloId/create" element={<CrearProcesoFabricacionPage/>} />
    <Route path='/procesoFabricacion/:modeloId/editar'element={<EditarProcesoFabricacionPage/>}/>
    <Route path='/procesoFabricacion/:modeloId/show'element={<ProcesoFabricacionDetailPage/>}/>

    <Route path="/produccion/home" element={<ProduccionHomePage />} />
    <Route path="/produccion/generar-ordenes" element={<GenerarOrdenesPage />} />
    <Route path="/produccion/modelos/:modeloId/generar-orden" element={<CrearOrdenProduccionPage />} />
    <Route path="/produccion/asignar-tareas/generar-ordenes" element={<TareasProduccionPage />} />
    <Route path="/produccion/tareas/:tareaId/asignar/:puestoTrabajoId" element={<AsignarTareaProduccionPage />} />


    <Route path="/empleado/form" element={<EmpleadoFormPage />} />
    <Route path="/empleado/view" element={<ViewEmpleadosPage />} />
    <Route path="/empleados/:id/editar" element={<UpdateEmpleadoFormPage />} />
    <Route path="/empleados/:id/detail" element={<ViewEmpleadoDetailPage />} />
</Route>

{/* Rutas operario */}
<Route element={<RoleRedirect allowedRoles={["operario"]} />}>
    <Route path="/homeOperario" element={<OperarioHomePage />} />
    <Route path="/operario/tareas-disponibles" element={<TareasDisponiblesPage />} />
    <Route path='/operario/mi-tarea-actual' element={<MiTareaActualPage/>}/>
    <Route path='/operario/:id/show'element={<OperarioShowPage/>}/>
</Route>

{/* Rutas generales */}
<Route element={<RoleRedirect allowedRoles={["operario"]} />}>
     <Route path='/procesoFabricacion/:modeloId/show'element={<ProcesoFabricacionDetailPage/>}/>
     <Route path='/tareas/:tareaId/showInstrucciones'element={<TareaInstruccionesPage/>}/>
     
</Route>

      </Route>
    </Route>
  </Routes>
</BrowserRouter>
  )
}
