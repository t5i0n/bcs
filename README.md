# BCS Coffee Market Consulting

A Vite + React + TypeScript landing page for BCS Coffee Market Consulting.

## Project structure

- `src/main.tsx` — app entry point
- `src/App.tsx` — route definitions and router setup
- `src/routes/index.tsx` — homepage route component
- `src/routes/*.tsx` — page route components for about, services, origins, process, blog, contact, and not found
- `src/components/site` — shared layout and site-level components
- `src/assets` — image assets used in the homepage
- `public/` — static assets

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint on the project

## Recommended workflow

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Notes

This project currently uses `react-router-dom` for routing.

The homepage is implemented in `src/routes/index.tsx`, while `src/App.tsx` is responsible for mounting the route structure.
