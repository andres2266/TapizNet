import React from 'react'
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
        <Route path="/homeAdmin" element={<HomePage/>} />
        <Route path='/empleado/form' element={<EmpleadoFormPage/>}/>
        <Route path='/empleado/view' element={<ViewEmpleadosPage/>}/>
        <Route path='/empleados/:id/editar' element={<UpdateEmpleadoFormPage/>}/>
        <Route path='/empleados/:id/detail' element={<ViewEmpleadoDetailPage/>}/>
      </Route>
    </Route>
  </Routes>
</BrowserRouter>
  )
}
