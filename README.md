# BCS Coffee Market Consulting

Marketing website for BCS Coffee Market Consulting, an Ethiopian coffee sourcing and consulting business. The site presents the company, its services, coffee origins, field process, and a buyer inquiry path.

## Current status

The frontend is implemented and ready for local development and production builds.

**Pages** — Six public pages (Home, About, Services, Origins, Field, Contact) plus a custom 404 page, wired with React Router.

**Design & UX**

- Full dark mode with a toggle that persists across visits (`src/use-theme.ts`).
- Responsive shared navbar and footer with a mobile menu.
- Consistent design system built on Tailwind CSS 4 custom tokens (colors, typography, spacing).

**Content & architecture**

- The homepage includes hero stats, company background, services, coffee origins, testimonials, and a contact call to action.
- Services, coffee regions, and the contact form are defined once and shared across pages (`src/data/services.ts`, `src/data/regions.ts`, `src/components/site/ContactForm.tsx`), so content stays consistent site-wide.
- Contact details (phones, WhatsApp, email, address) are unified across all pages.

**SEO, accessibility & performance**

- `robots.txt`, `sitemap.xml`, an Open Graph share image (`og-image.jpg`), and a custom favicon are included.
- Images have explicit dimensions and lazy loading to avoid layout shift; the mobile menu exposes proper ARIA state.

**Forms** — The inquiry form (homepage and contact page) opens the visitor's email application with a pre-filled message addressed to `info@bcscoffee.et`.

### Remaining work

The following items are waiting on client input and do not block the build:

- **Form delivery** — The form uses a `mailto:` fallback and does not yet submit to a form service. Once the client provides a Web3Forms access key, swap the handler in `src/components/site/ContactForm.tsx`.
- **Social links** — The footer social icons are still `href="#"` placeholders pending the client's profile URLs (`src/components/site/Footer.tsx`).
- **Domain** — The SEO files assume `https://bcscoffee.et`; update `public/sitemap.xml` and `public/robots.txt` if the production domain differs.

## Technology

- React 19 and TypeScript
- Vite 8
- React Router
- Tailwind CSS 4
- Lucide React icons
- ESLint

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | Company background and approach |
| `/services` | Coffee sourcing and consulting services |
| `/origins` | Ethiopian coffee regions |
| `/field` | Field process and quality workflow |
| `/contact` | Buyer inquiry form |

## Getting started

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL after the server starts.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the app and create a production build. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project structure

```text
src/
├── assets/             # Coffee and farm imagery
├── components/site/    # Shared layout, navigation, footer, and form components
├── data/               # Service and coffee-region content
├── routes/             # Page-level route components
├── App.tsx             # Route definitions
├── use-theme.ts        # Dark-mode theme hook
└── main.tsx            # Application entry point
```

## Deployment notes

The public SEO files reference `https://bcscoffee.et`. Update `public/sitemap.xml` and `public/robots.txt` if the production domain changes.
