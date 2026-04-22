import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from '../pages/auth/RegisterPage';
import { authStore } from '../stores/auth';
import LandingPage from '../pages/auth/LandingPage';
import { PublicGuard } from './guards/PublicGuard';
import LoginPage from '../pages/auth/LoginPage';
export default function AppRouter() {
    const empleado = authStore((state)=>state.empleado)
    const token = authStore((state)=>state.token)
  return (
       <BrowserRouter>
            <Routes>
                 <Route path='/' element={token?(empleado?.rol==='operario'?
                    <Navigate to='/mis-tareas' replace/>:
                    <Navigate to='/administracion' replace/>):<LandingPage/>}>
            </Route>
            <Route element={<PublicGuard/>}>
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path='/login' element={<LoginPage/>}/>
            </Route>
            </Routes>
        </BrowserRouter>
  )
}
