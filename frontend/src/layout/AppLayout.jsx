import React from 'react'
import { Outlet } from "react-router-dom";
import '../styles/app.css'
import '../styles/forms.css'
import "../styles/table.css"
import '../styles/detaill.css'
export default function AppLayout() {
  return (
<div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <span>TN</span>
                    <h2>TapizNet</h2>
                </div>
            </aside>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
  )
}