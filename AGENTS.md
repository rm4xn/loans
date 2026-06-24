# Loans — Agent Guide

## Quick start

```sh
bun install        # install dependencies
bun dev            # start Vite dev server
bun build          # production build
bun lint           # ESLint v10 flat config
bun preview        # preview production build
```

**Package manager: Bun** (not npm). Lockfile: `bun.lock`.

## Project facts

- **Vanilla JavaScript (JSX)** — no TypeScript, no `tsconfig`. Use `.jsx` for React components.
- **No test framework** — no tests exist. Do not run or add test commands.
- **No formatter** configured (no Prettier, no `.editorconfig`).
- **ESM** — `"type": "module"` in `package.json`.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not `@tailwind` directives from v3).
- **DaisyUI v5** — loaded as `@plugin "daisyui"` in CSS; provides UI component classes.
- **React Router v7** — nested routes defined in `src/main.jsx`. `BaseLayout` is a centered `<max-w-lg>` wrapper. `App` adds a bottom dock (tab bar).
- **Zustand v5** with `localStorage` persistence (key: `'store'`). Custom JSON reviver restores ISO date strings to `Date` objects on rehydrate.
- **IDs** use `crypto.randomUUID()` — no UUID library dependency.
- **No `.env` files** or environment configuration needed.
- **ESLint v10** — flat config in `eslint.config.js`. Ignores `dist/`.

## Known issues

- The dock nav has a **Settings link but no route** — navigating there renders a blank page.

## Architecture

```
src/main.jsx          → React entrypoint, route definitions
src/App.jsx           → root layout (dock + <Outlet/>)
src/store.js          → Zustand store (loans + contacts slices)
src/classes/Loan.js   → Loan model
src/classes/Contact.js→ Contact model
src/pages/            → Home, Contacts, Loan (detail)
src/components/       → BaseLayout, ContactForm, LoanForm
```
