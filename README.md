# BCS Coffee Market Consulting

A production-style marketing website and admin backend for BCS Coffee Market Consulting, built as a 2-month internship project.

## Project structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── components/     # Shared UI components
│   │   ├── data/           # Static data (services, regions)
│   │   ├── i18n/           # Translations (EN, AM, FR, ZH)
│   │   ├── lib/            # API client, analytics, monitoring
│   │   ├── routes/         # Page route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── assets/         # Images
│   │   ├── App.tsx         # Route definitions
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes (auth, admin, public)
│   │   ├── middleware/      # Auth middleware
│   │   └── utils/          # Logger, helpers
│   └── prisma/             # Database schema
├── .gitignore
└── README.md
```

## Features

### Public Website (`client/`)
- **6 pages** — Home, About, Services, Origins, From the Field, Contact
- **4 languages** — English, Amharic, French, Chinese
- **Dark mode** — persistent toggle with system preference detection
- **Interactive Ethiopian coffee map** — SVG map with clickable region pins
- **Contact form** — connected to backend API with validation
- **Cookie consent** — privacy-conscious analytics opt-in
- **SEO** — og:image, meta tags, sitemap.xml, robots.txt

### Admin Dashboard (`client/` → `/admin`)
- **Authentication** — JWT-based login with secure sessions
- **Commodities management** — CRUD for coffee inventory, pricing, and stock
- **Contact submissions** — view, filter, and manage inquiries
- **Site content (CMS)** — edit website text without code changes
- **Settings** — site configuration management

### Backend API (`server/`)
- **Node.js + Express.js** with TypeScript
- **SQLite** database via Prisma ORM
- **JWT authentication** with password hashing
- **REST API** with admin and public routes
- **Sentry integration** for production error monitoring

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, i18next, Lucide React |
| Backend | Node.js, Express.js, Prisma, SQLite, JWT |
| DevOps | ESLint, Sentry (optional), Google Analytics (optional) |

## Setup

### Frontend
```bash
cd client
npm install
npm run dev        # Start dev server on port 5173
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Backend
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run db:seed    # Seed initial data
npm run dev        # Start API server on port 3001
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/about` | About BCS |
| `/services` | Services overview |
| `/origins` | Coffee origins & interactive map |
| `/field` | From the Field — photo gallery |
| `/contact` | Contact form & information |
| `/admin` | Admin dashboard (login required) |

## Admin credentials

- **Email:** admin@bcscoffee.et
- **Password:** admin123
