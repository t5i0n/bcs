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
- **7 pages** — Home, About, Services, Origins, From the Field, Our Team, Contact
- **4 languages** — English, Amharic, French, Chinese (all pages fully translated)
- **Dark mode** — persistent toggle with system preference detection (available in Settings)
- **Interactive Ethiopian coffee map** — SVG map with clickable region pins, translated descriptions
- **Photo carousel** — auto-sliding photos on the home hero section with drag/swipe support
- **Contact form** — connected to backend API with validation
- **Opening hours** — displayed on the contact page with LT (Local Time) indicators
- **Get Directions** — link to OpenStreetMap for the office location
- **Cookie consent** — privacy-conscious analytics opt-in
- **SEO** — og:image, meta tags, sitemap.xml, robots.txt

### Our Team Page (`/team`)
- **3 team members** with profile photos, roles, and descriptions
- **Social links** — Email, LinkedIn, Instagram icons
- **Fully translated** — names, roles, and descriptions change with language selector

### Admin Dashboard (`client/` → `/admin`)
- **Authentication** — JWT-based login with secure sessions
- **Commodities management** — CRUD for coffee inventory with dropdowns:
  - Source of Coffee (Commercial, Grower, Vertical, Union, Farmer, Value Added)
  - Coffee Grade (1-5, UG, NG, Perberry Coffee)
  - Coffee Type (Yirgacheffe, Sidama, Guji, Limu, Jimma, Nekemte, Harrar)
  - Coffee Status (Green Bean, Roast and Grind, Other)
  - Processing Type (Washed, Unwashed)
  - Price per Unit in ETB (Ethiopian Birr)
- **Contact submissions** — view, filter, and manage inquiries
- **Site content (CMS)** — edit website text without code changes
- **Settings** — theme toggle, social media links, contact information

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
| `/` | Homepage with photo carousel |
| `/about` | About BCS |
| `/services` | Services overview |
| `/origins` | Coffee origins & interactive map |
| `/field` | From the Field — photo gallery |
| `/team` | Our Team — meet the members |
| `/contact` | Contact form, opening hours & directions |
| `/admin` | Admin dashboard (login required) |

## Admin credentials

- **Email:** admin@bcscoffee.et
- **Password:** admin123
