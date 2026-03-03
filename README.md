## 📋 Descripción del Proyecto

**TapizNet** es una plataforma web de gestión de procesos de fabricación (BPMS) diseñada específicamente para talleres de tapicería artesanal. El sistema permite digitalizar y optimizar todo el ciclo de producción de sofás, desde la definición de modelos hasta la asignación de tareas en cada estación de trabajo.

La aplicación funciona como el **"director de orquesta"** del taller, permitiendo que:
- 🏭 **Múltiples tapicerías** puedan registrarse y gestionar su propio espacio de trabajo.
- 📐 **El encargado** pueda definir modelos de sofá y sus procesos de fabricación asociados.
- 📦 **Al crear un pedido**, el sistema genere automáticamente todas las tareas necesarias.
- 👷 **Los trabajadores** reciban en su estación las tareas que deben realizar.
- 📊 **El encargado** tenga visibilidad en tiempo real del estado de toda la producción.

### 🎯 Problema que resuelve

Las tapicerías tradicionales gestionan la producción de forma verbal y con notas adhesivas, lo que genera:
- Pérdida de información y conocimiento.
- Dificultad para estimar fechas de entrega.
- Falta de visibilidad del estado real de los pedidos.
- Cuellos de botella no detectados.
- Inconsistencia en la calidad por falta de estandarización.

**TapizNet** transforma esta realidad digitalizando los procesos y dando control total al encargado sobre la producción.

---

## 🎯 Objetivos

### Objetivo General

Desarrollar una plataforma web que revolucione la gestión interna de los talleres de tapicería, proporcionando al encargado un sistema centralizado de control de producción con visibilidad en tiempo real, que además incorpore inteligencia artificial asistiva para optimizar la asignación de tareas y la planificación de pedidos.

### Objetivos Específicos

1. **Multi-tenencia:** Implementar un sistema que permita a múltiples tapicerías registrarse y operar de forma independiente en la plataforma, con aislamiento total de sus datos.

2. **Modelado de Producto:** Desarrollar un módulo para que cada tapicería pueda crear su catálogo de modelos de sofá y definir para cada uno su ruta de fabricación (secuencia de tareas por estación de trabajo).

3. **Gestión de Pedidos:** Crear un sistema que, al registrar un pedido con un modelo seleccionado, genere automáticamente todas las tareas necesarias según el proceso predefinido.

4. **Ejecución en Taller:** Implementar un tablero de control para el encargado que permita visualizar tareas pendientes por estación y asignarlas a trabajadores, y una vista personal para cada trabajador con sus tareas asignadas.

5. **Seguimiento:** Proporcionar dashboards de seguimiento que muestren el progreso de los pedidos en tiempo real, con alertas visuales de posibles retrasos.

6. **IA Asistiva (Diferenciador):** Incorporar algoritmos de recomendación que sugieran al encargado la asignación óptima de tareas basándose en el rendimiento histórico de los trabajadores.

---

## 🛠️ Tecnologías a Utilizar

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Laravel** | 10.x | Framework PHP para la API RESTful |
| **PHP** | 8.1+ | Lenguaje base |
| **MySQL** | 8.0 | Base de datos relacional |
| **Laravel Sanctum** | - | Autenticación API (tokens) |
| **Laravel Policies** | - | Autorización y permisos por rol |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Biblioteca para la interfaz de usuario |
| **TypeScript** | 5.x | Tipado estático para mayor robustez |
| **Vite** | 4.x | Bundler y entorno de desarrollo |
| **TailwindCSS** | 3.x | Framework de estilos utilitario |
| **React Router** | 6.x | Enrutamiento en el cliente |
| **Axios** | 1.x | Cliente HTTP para peticiones a la API |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| **Git** | Control de versiones |
| **Composer** | Gestor de dependencias PHP |
| **NPM/Yarn** | Gestor de dependencias Node |
| **Postman** | Pruebas de API |
| **VS Code** | Editor de código |

### Posibles Librerías Adicionales
- **Laravel Excel:** Para exportación de reportes.
- **Chart.js / Recharts:** Para gráficos en el dashboard.
- **React Beautiful DnD:** Para el tablero Kanban con drag & drop.
- **Laravel Queue:** Para procesamiento asíncrono (recomendaciones IA).

## 📁 Estructura del Proyecto (Planteada)
tapiznet/
├── backend/ # API en Laravel
│ ├── app/
│ │ ├── Models/ # Modelos (User, Taller, Modelo, Pedido, Tarea...)
│ │ ├── Http/
│ │ │ ├── Controllers/ # Controladores API
│ │ │ └── Middleware/ # Middlewares (verificación de taller)
│ │ ├── Policies/ # Políticas de autorización
│ │ └── Services/ # Lógica de negocio (IA, asignación)
│ ├── database/
│ │ ├── migrations/ # Migraciones de BD
│ │ └── seeders/ # Datos de prueba
│ └── routes/
│ └── api.php # Rutas de la API
│
├── frontend/ # SPA en React
│ ├── src/
│ │ ├── components/ # Componentes reutilizables
│ │ ├── pages/ # Páginas completas
│ │ │ ├── auth/ # Login, registro
│ │ │ ├── encargado/ # Vistas para encargado
│ │ │ └── trabajador/ # Vistas para trabajador
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # Llamadas a la API
│ │ ├── context/ # Context API (auth, taller)
│ │ └── types/ # Tipos TypeScript
│ └── public/ # Archivos estáticos
