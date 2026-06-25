# Loans — Gestor de préstamos personales

Aplicación SPA para llevar el control de préstamos personales. Funciona completamente en el navegador sin backend — los datos se persisten en `localStorage`.

## Tecnologías

| | |
|---|---|
| **React 19** + **React Router 7** | UI y enrutamiento cliente |
| **Zustand 5** | Estado global con persistencia en `localStorage` |
| **Tailwind CSS 4** + **DaisyUI 5** | Estilos utilitarios y componentes |
| **i18next** + **react-i18next** | Internacionalización (español / inglés) |
| **Lucide React** | Iconos |
| **Vite 8** | Build tool y dev server |
| **ESLint 10** | Linter (configuración plana) |

## Inicio rápido

```sh
bun install        # instalar dependencias
bun dev            # servidor de desarrollo
bun build          # build de producción
bun preview        # preview del build de producción
bun lint           # ejecutar ESLint
```

**Gestor de paquetes:** Bun (no npm).

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Dashboard con todos los préstamos |
| `/contacts` | Contacts | CRUD de contactos |
| `/settings` | Settings | Preferencias (idioma, moneda, tema, plantilla WhatsApp) |
| `/loans/:id` | Loan | Detalle de un préstamo |

## Funcionalidades

- **Préstamos:** crear, editar, eliminar y ver detalle con información completa
- **Contactos:** gestionar personas con nombre y teléfono
- **Multimoneda:** 14 monedas (USD, PEN, EUR, GBP, JPY, CNY, MXN, BRL, ARS, CAD, AUD, CHF, INR, KRW)
- **Moneda predeterminada:** configurable desde Ajustes para nuevos préstamos
- **Temas:** claro, oscuro y seguimiento del sistema (sin flash al cargar)
- **Internacionalización:** español e inglés, cambio instantáneo
- **WhatsApp:** recordatorio personalizable desde el detalle del préstamo
- **Persistencia local:** los datos se guardan automáticamente en `localStorage`

## Estructura del proyecto

```
src/
├── main.jsx              # Punto de entrada y definición de rutas
├── App.jsx               # Layout raíz (barra de navegación inferior)
├── store.js              # Store de Zustand con persistencia
├── index.css             # Estilos globales (Tailwind + DaisyUI)
├── classes/
│   ├── Loan.js           # Modelo de préstamo
│   └── Contact.js        # Modelo de contacto
├── components/
│   ├── BaseLayout.jsx    # Contenedor centrado (max-w-lg)
│   ├── ContactForm.jsx   # Modal para crear/editar contactos
│   ├── EmptyState.jsx    # Estado vacío reutilizable
│   ├── LoanCard.jsx      # Tarjeta de préstamo para el dashboard
│   ├── LoanForm.jsx      # Modal para crear/editar préstamos
│   └── SettingsCard.jsx  # Envoltorio de tarjeta para ajustes
├── pages/
│   ├── Home.jsx          # Dashboard de préstamos
│   ├── Contacts.jsx      # CRUD de contactos
│   ├── Loan.jsx          # Detalle de préstamo
│   └── Settings.jsx      # Preferencias de la app
└── utils/
    ├── currency.js       # Definiciones de monedas
    ├── date.js           # Formateo relativo de fechas
    ├── id.js             # Generación de IDs auto-incrementales
    ├── storage.js        # Envoltorio seguro de localStorage
    └── theme.js          # Gestión del tema (data-theme)
```

## Notas técnicas

- **JavaScript (JSX) puro** — sin TypeScript.
- **IDs numéricos auto-incrementales** (`src/utils/id.js`).
- **Persistencia:** Zustand con middleware `persist` y clave `store:v1` en `localStorage`. Incluye un `reviver` personalizado que restaura cadenas ISO 8601 a objetos `Date`. Fallback a memoria si `localStorage` no está disponible.
- **Tema:** se aplica con `data-theme` en `<html>`; un script inline en `index.html` evita el flash de contenido antes de que React hidrate. El modo sistema escucha `prefers-color-scheme` en tiempo real.
- **Sin tests, sin formateador de código.**

## Despliegue en Vercel

El proyecto incluye `vercel.json` con reglas de reescritura SPA. No requiere variables de entorno.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
