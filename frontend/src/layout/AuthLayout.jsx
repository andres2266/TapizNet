import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import AppRouter from '../routes/AppRouter'
import '../index.css'
import "../styles/auth.css";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
          <Outlet/>
    </main>
  )
}
