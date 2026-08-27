# Deployment Guide

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 9+
- A domain name (assumed: `bcscoffee.et`)
- Sentry account (optional, for error monitoring)
- Google Analytics account (optional)

---

## Environment Variables

### Frontend (`VITE_*` variables)

Create a `.env` file in the project root:

```env
# Backend API URL (must include /api)
VITE_API_URL=https://api.bcscoffee.et/api

# Google Analytics (optional — leave empty to disable)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry DSN (optional — leave empty to disable)
VITE_SENTRY_DSN=https://xxxx@sentry.io/xxxx
```

### Backend (`server/.env`)

```env
# Database (SQLite for dev, switch to PostgreSQL for production)
DATABASE_URL="file:./dev.db"

# JWT authentication
JWT_SECRET="your-strong-random-secret-here"
JWT_EXPIRES_IN="7d"

# Server port
PORT=3001

# CORS (must match your frontend domain)
CORS_ORIGIN="https://bcscoffee.et"

# Sentry (optional)
SENTRY_DSN="https://xxxx@sentry.io/xxxx"
```

---

## Setup Steps

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Set up the database

```bash
cd server
npx prisma generate
npx prisma db push
npm run db:seed
```

### 3. Create admin account

The seed script creates a default admin:
- **Email:** admin@bcscoffee.et
- **Password:** admin123

**Change the password immediately after first login.**

### 4. Start development servers

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
cd server && npm run dev
```

### 5. Build for production

```bash
# Frontend
npm run build

# Backend (compiles TypeScript)
cd server && npx tsc
```

---

## Production Deployment

### Frontend

Upload the `dist/` folder to your hosting provider (Vercel, Netlify, Nginx, etc.).

**SPA routing:** Ensure all routes fall back to `index.html` (client-side routing).

### Backend

Run the compiled server with Node.js:

```bash
cd server
node dist/index.js
```

Use a process manager like PM2:

```bash
pm2 start dist/index.js --name bcs-api
```

### Reverse Proxy (Nginx example)

```nginx
server {
    listen 443 ssl http2;
    server_name bcscoffee.et;

    # Frontend
    location / {
        root /var/www/bcscoffee/dist;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://bcscoffee.et`
3. Verify via DNS TXT record or HTML meta tag
4. Submit the sitemap: `https://bcscoffee.et/sitemap.xml`

---

## Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to `.env` as `VITE_GA_MEASUREMENT_ID`
4. Rebuild and deploy

Analytics only loads after the user accepts cookies (cookie consent banner).

---

## Error Monitoring (Sentry)

1. Create a project at [sentry.io](https://sentry.io)
2. Copy the DSN for both frontend and backend
3. Add to `.env` files (see above)
4. Errors are only reported if the user has accepted analytics cookies

---

## Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Set real social media links in Footer
- [ ] Configure Web3Forms or upgrade contact form
- [ ] Verify domain in Google Search Console
- [ ] Submit sitemap
- [ ] Test all routes work with SPA fallback
- [ ] Verify HTTPS is active
- [ ] Test cookie consent banner
- [ ] Verify dark mode persistence
- [ ] Test all 4 language translations
- [ ] Test Arabic RTL layout
- [ ] Verify contact form submissions reach admin
- [ ] Check admin dashboard login works
- [ ] Verify Sentry error monitoring (if configured)
- [ ] Verify Google Analytics (if configured)
