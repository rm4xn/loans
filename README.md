# Loans — Personal Loan Tracker

A client-side SPA for tracking personal loans. Runs entirely in the browser with no backend — data is persisted to `localStorage`.

## Tech Stack

| | |
|---|---|
| **React 19** + **React Router 7** | UI and client-side routing |
| **Zustand 5** | State management with `localStorage` persistence |
| **Tailwind CSS 4** + **DaisyUI 5** | Utility CSS and UI components |
| **i18next** + **react-i18next** | Internationalization (English / Spanish) |
| **Lucide React** | Icons |
| **Vite 8** | Build tool and dev server |
| **ESLint 10** | Linter (flat config) |

## Quick start

```sh
bun install        # install dependencies
bun dev            # start dev server
bun build          # production build
bun preview        # preview production build
bun lint           # run ESLint
```

**Package manager:** Bun (not npm).

## Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Loan dashboard |
| `/contacts` | Contacts | Contact CRUD |
| `/settings` | Settings | Preferences (language, currency, theme, WhatsApp template) |
| `/loans/:id` | Loan | Loan detail |

## Features

- **Loans:** create, edit, delete, and view full loan details
- **Contacts:** manage people with name and phone number
- **Multi-currency:** 14 currencies (USD, PEN, EUR, GBP, JPY, CNY, MXN, BRL, ARS, CAD, AUD, CHF, INR, KRW)
- **Default currency:** configurable in Settings for new loans
- **Themes:** light, dark, and system follow (no flash on load)
- **i18n:** English and Spanish, instant switching
- **WhatsApp:** customizable reminder message from loan detail
- **Local persistence:** data auto-saves to `localStorage`

## Project structure

```
src/
├── main.jsx              # Entry point and route definitions
├── App.jsx               # Root layout (bottom dock)
├── store.js              # Zustand store with persistence
├── index.css             # Global styles (Tailwind + DaisyUI)
├── classes/
│   ├── Loan.js           # Loan model
│   └── Contact.js        # Contact model
├── components/
│   ├── BaseLayout.jsx    # Centered container (max-w-lg)
│   ├── ContactForm.jsx   # Modal for creating/editing contacts
│   ├── EmptyState.jsx    # Reusable empty state
│   ├── LoanCard.jsx      # Loan card for the dashboard
│   ├── LoanForm.jsx      # Modal for creating/editing loans
│   └── SettingsCard.jsx  # Settings card wrapper
├── pages/
│   ├── Home.jsx          # Loan dashboard
│   ├── Contacts.jsx      # Contact CRUD
│   ├── Loan.jsx          # Loan detail
│   └── Settings.jsx      # App preferences
└── utils/
    ├── currency.js       # Currency definitions
    ├── date.js           # Relative date formatting
    ├── id.js             # Auto-incrementing ID generator
    ├── storage.js        # Safe localStorage wrapper
    └── theme.js          # Theme management (data-theme)
```

## Technical notes

- **Vanilla JavaScript (JSX)** — no TypeScript.
- **Numeric auto-incrementing IDs** (`src/utils/id.js`).
- **Persistence:** Zustand `persist` middleware with key `store:v1` in `localStorage`. Custom reviver restores ISO 8601 strings to `Date` objects. Falls back to in-memory storage if `localStorage` is unavailable.
- **Theme:** applied via `data-theme` on `<html>`; an inline script in `index.html` prevents flash before React hydrates. System mode listens to `prefers-color-scheme` in real time.
- **No tests, no code formatter.**

## Vercel deployment

Includes `vercel.json` with SPA rewrite rules. No environment variables required.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
