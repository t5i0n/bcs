# BCS Coffee Market Consulting

An internship project: a Vite + React + TypeScript landing page built for BCS Coffee Market Consulting.

## About this project

This project was developed as part of an internship, with the goal of building a production-style
marketing website for a coffee export and consulting business. It covers the full front-end workflow
of a client site — from page structure and routing to styling, responsive design, and content layout —
using a modern React toolchain.

**Internship goals covered by this project:**
- Structuring a multi-page site with client-side routing
- Building reusable layout and UI components (navbar, footer, shared layout)
- Implementing a consistent design system with Tailwind CSS (custom theme, colors, typography)
- Working with static assets and image-heavy content sections
- Debugging and resolving real build/styling issues (e.g. Tailwind configuration, CSS variable wiring)
- Following clean project structure and linting conventions

## Project structure

- `src/main.tsx` — app entry point
- `src/App.tsx` — route definitions and router setup
- `src/routes/index.tsx` — homepage route component
- `src/routes/*.tsx` — page route components for about, services, origins, process, blog, contact, and not found
- `src/components/site` — shared layout and site-level components
- `src/assets` — image assets used in the homepage
- `public/` — static assets

## Tech stack

- **React** + **TypeScript** — component structure and type safety
- **Vite** — build tool and dev server
- **react-router-dom** — client-side routing
- **Tailwind CSS (v4)** — utility-first styling and custom design tokens
- **ESLint** — code quality and linting

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

This project currently uses `react-router-dom` for routing. The homepage is implemented in
`src/routes/index.tsx`, while `src/App.tsx` is responsible for mounting the route structure.

This repository represents ongoing internship work and may continue to be updated with new
pages, features, and refinements as the project progresses.
