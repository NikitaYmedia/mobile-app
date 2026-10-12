# Pocket

Personal finance app (demo). React + TypeScript + Vite + Tailwind CSS + Recharts + Zustand + React Router.

## Run
```bash
npm install
npm run dev
```
Open the URL Vite prints. To view on a phone (same Wi-Fi), open the `Network:` URL from the terminal.

```bash
npm run build     # type-check + production build
npm run preview
```

## Structure
- `src/store.ts` - Zustand store, persisted to localStorage (`pocket-demo-v1`), demo seed data
- `src/lib/calc.ts` - all money math (integer cents), balance, period filters, CSV
- `src/lib/categories.ts` - category list, icons, colors
- `src/components/` - AppShell (bottom nav / sidebar), DonutChart (Recharts), shared UI
- `src/pages/` - Home, Transactions, AddTransaction, Budgets, Goals, Profile
- Theme colors are CSS variables in `src/index.css` (dark/light), mapped in `tailwind.config.js`

## Flow
`/welcome` (animated splash, auto-continues) -> `/auth/sign-up` (Google / Apple / email) -> app. Auth is a front-end demo only: no server, any details work, the session is kept in localStorage. Sign out is in Profile.

## Not implemented yet
Real auth (Supabase, Google/Apple OAuth), database, PWA, Analytics screen, edit transaction, toasts, react-hook-form + zod, tests.
Transfer is disabled on purpose.


## NOTE!!!!!!

This project is a web application designed for and specifically adapted to mobile phones.