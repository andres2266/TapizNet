// src/utils/icons.jsx
// Iconos SVG profesionales con tamaño controlable

import React from 'react';

// Componente base para iconos (evita repetir código)
const IconBase = ({ children, size = 20, strokeWidth = 1.7, ...props }) => (
    <svg 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        fill="none"
        style={{ width: size, height: size, flexShrink: 0 }}
        {...props}
    >
        {children}
    </svg>
);

// ============================================
// ICONOS GENERALES
// ============================================

export const IconUsers = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </IconBase>
);

export const IconViewUsers = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </IconBase>
);

export const IconPositions = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </IconBase>
);

export const IconModels = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </IconBase>
);

export const IconOrders = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </IconBase>
);

export const IconPayments = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconBase>
);

export const IconCalendar = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </IconBase>
);

export const IconArrowRight = ({ size = 14 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M9 5l7 7-7 7" />
    </IconBase>
);

export const IconDashboard = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </IconBase>
);

export const IconClose = ({ size = 20 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M6 18L18 6M6 6l12 12" />
    </IconBase>
);

export const IconEdit = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </IconBase>
);

export const IconDelete = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </IconBase>
);

export const IconSearch = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </IconBase>
);

// ============================================
// ICONOS PARA FORMULARIOS (tamaño pequeño por defecto)
// ============================================

export const IconUserSingle = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </IconBase>
);

export const IconEmail = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </IconBase>
);

export const IconLock = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </IconBase>
);

export const IconPhone = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </IconBase>
);

export const IconId = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0h4" />
    </IconBase>
);

export const IconContract = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </IconBase>
);

export const IconMoney = ({ size = 14, ...props }) => (  // ← Cambiado a 14
    <IconBase size={size} {...props}>
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </IconBase>
);

export const IconRole = ({ size = 16 }) => (
    <IconBase size={size}>
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </IconBase>
);

export const IconCheck = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconBase>
);

export const IconAlert = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconBase>
);

export const IconInfo = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconBase>
);

export const IconPlus = ({ size = 20 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M12 4v16m8-8H4" />
    </IconBase>
);

export const IconSave = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M5 13l4 4L19 7" />
    </IconBase>
);

export const IconRefresh = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </IconBase>
);

// Icono: Clock / Reloj
export const IconClock = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </IconBase>
);

// Icono: Progress / Progreso
export const IconProgress = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </IconBase>
);

// Icono: Box / Caja (unidades)
export const IconBox = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </IconBase>
);


export const IconView = ({ size = 20 }) => (
    <IconBase size={size}>
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </IconBase>
);

// Icono para Chevron Left (flecha izquierda)
export const IconChevronLeft = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M15 19l-7-7 7-7" />
    </IconBase>
);

// Icono para Chevron Right (flecha derecha)
export const IconChevronRight = ({ size = 16 }) => (
    <IconBase size={size} strokeWidth={2}>
        <path d="M9 5l7 7-7 7" />
    </IconBase>
);
// ============================================
// OBJETO PRINCIPAL PARA IMPORTACIÓN MÚLTIPLE
// ============================================

const Icons = {
    // Generales
    Users: IconUsers,
    ViewUsers: IconViewUsers,
    Positions: IconPositions,
    Models: IconModels,
    Orders: IconOrders,
    Payments: IconPayments,
    Calendar: IconCalendar,
    ArrowRight: IconArrowRight,
    Dashboard: IconDashboard,
    Close: IconClose,
    Edit: IconEdit,
    Delete: IconDelete,
    Search: IconSearch,
    // Formularios
    UserSingle: IconUserSingle,
    Email: IconEmail,
    Lock: IconLock,
    Phone: IconPhone,
    Id: IconId,
    Contract: IconContract,
    Money: IconMoney,
    Role: IconRole,
    Check: IconCheck,
    Alert: IconAlert,
    Info: IconInfo,
    Plus: IconPlus,
    Save: IconSave,
    Refresh: IconRefresh,
    Clock: IconClock,
    Progress: IconProgress,
    Box: IconBox,
    View: IconView,           
    ChevronLeft: IconChevronLeft,   
    ChevronRight: IconChevronRight,
};

export default Icons;