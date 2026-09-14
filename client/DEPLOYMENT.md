# Deployment Guide — BCS Coffee Market Consulting

## Prerequisites

- **Node.js 20+** (required — ES modules and Express 5 need modern Node)
- **npm 9+**
- **Domain name:** `bcscoffeemarket.com`
- Sentry account (optional — error monitoring)
- Google Analytics account (optional)

---

## Architecture

```
                    ┌─────────────────────┐
  Browser  ───────► │   Nginx / Apache     │
                    │   (reverse proxy)    │
                    └──────┬──────┬───────┘
                           │      │
              Static files │      │ /api proxy
              (dist/)      │      │
                           ▼      ▼
                    ┌──────────┐ ┌──────────────┐
                    │ Frontend │ │   Backend    │
                    │ (React)  │ │ (Express)    │
                    │  :443    │ │  :3001       │
                    └──────────┘ └──────┬───────┘
                                        │
                                        ▼
                                 ┌──────────────┐
                                 │   SQLite DB   │
                                 │  (dev.db)     │
                                 └──────────────┘
```

- **Frontend:** React SPA served as static files from `client/dist/`
- **Backend:** Express API running on port 3001, proxied through Nginx at `/api`
- **Database:** SQLite (single file, fine for initial deployment)

---

## Environment Variables

### Frontend (`client/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend base URL **without** `/api` (e.g. `https://bcscoffeemarket.com`) |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID |
| `VITE_SENTRY_DSN` | No | Sentry DSN for frontend error tracking |

### Backend (`server/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite path: `file:./dev.db` |
| `JWT_SECRET` | Yes | Random secret — **server refuses to start without it in production** |
| `JWT_EXPIRES_IN` | Yes | Token expiry (e.g. `7d`) |
| `PORT` | Yes | Server port (e.g. `3001`) |
| `NODE_ENV` | Yes | Set to `production` on the server |
| `CORS_ORIGIN` | Yes | Comma-separated allowed origins (e.g. `https://bcscoffeemarket.com`) |
| `SENTRY_DSN` | No | Sentry DSN for backend error tracking |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, or `error` (default: `info`) |

---

## Step-by-Step Deployment

### 1. Install Node.js 20+

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should show v20.x or higher
```

### 2. Install PM2 (process manager)

```bash
sudo npm install -g pm2
```

### 3. Upload / clone the project

```bash
cd /var/www
git clone <your-repo-url> bcscoffee
cd bcscoffee
```

### 4. Set up the frontend

```bash
cd client

# Create production .env
cat > .env << 'EOF'
VITE_API_URL=https://bcscoffeemarket.com
VITE_GA_MEASUREMENT_ID=
VITE_SENTRY_DSN=
EOF

# Install and build
npm install
npm run build
```

The build output goes to `client/dist/`.

### 5. Set up the backend

```bash
cd ../server

# Create production .env
JWT_SECRET=$(openssl rand -hex 32)
cat > .env << EOF
DATABASE_URL="file:./dev.db"
JWT_SECRET="${JWT_SECRET}"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=production
CORS_ORIGIN="https://bcscoffeemarket.com"
SENTRY_DSN=
LOG_LEVEL=info
EOF

# Install dependencies (production only)
npm install

# Generate Prisma Client (must run on the target server)
npx prisma generate

# Push the database schema
npx prisma db push

# Seed the database (safe to run multiple times)
npm run db:seed

# Seed CMS content
npx tsx src/seed-content.ts
```

### 6. Build and start the backend

```bash
# Compile TypeScript
npx tsc

# Test that it starts
node dist/index.js
# Press Ctrl+C after confirming it starts

# Start with PM2
pm2 start dist/index.js --name bcs-api
pm2 save
pm2 startup  # Follow the instructions it prints
```

### 7. Configure Nginx

```nginx
server {
    listen 80;
    server_name bcscoffeemarket.com www.bcscoffeemarket.com;
    return 301 https://bcscoffeemarket.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bcscoffeemarket.com;

    # SSL (use Certbot — see step 8)
    ssl_certificate     /etc/letsencrypt/live/bcscoffeemarket.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bcscoffeeterms.com/privkey.pem;

    # Frontend — serve the React SPA
    root /var/www/bcscoffee/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API — proxy to Express
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

```bash
sudo nginx -t          # Test the config
sudo systemctl restart nginx
```

### 8. Set up SSL with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bcscoffeemarket.com -d www.bcscoffeemarket.com
```

### 9. Point your domain DNS

At your domain registrar, create:

| Type | Name | Value |
|------|------|-------|
| A | @ | Your server IP |
| A | www | Your server IP |

---

## Post-Deployment Checklist

- [ ] Change the default admin password (login at `/admin`)
- [ ] Set real social media links in admin Settings
- [ ] Verify `https://bcscoffeemarket.com` loads correctly
- [ ] Verify `https://bcscoffeemarket.com/admin` login works
- [ ] Test the contact form submission
- [ ] Test all public routes: `/about`, `/services`, `/origins`, `/field`, `/contact`, `/team`
- [ ] Verify dark mode persistence
- [ ] Test all 4 language translations
- [ ] Test Arabic RTL layout
- [ ] Verify HTTPS is active and auto-renews
- [ ] Submit sitemap to Google Search Console

---

## Useful Commands

```bash
# Check backend status
pm2 status
pm2 logs bcs-api

# Restart backend
pm2 restart bcs-api

# View backend logs
pm2 logs bcs-api --lines 50

# Rebuild frontend after changes
cd client && npm run build

# Rebuild backend after changes
cd server && npx tsc && pm2 restart bcs-api

# Check database
cd server && npx prisma studio
```

---

## Limitations / Notes

- **SQLite** is single-file and single-writer. Fine for initial deployment. If traffic grows, switch to PostgreSQL.
- **Rate limiting** is in-memory (resets on server restart). Fine for a single server.
- **Video files** in `client/public/` are ~1.2 GB total. These get included in the frontend build. Consider moving them to external hosting (YouTube, Vimeo, or a CDN) to reduce build size and improve load times.
- **No file upload routes** currently exist, but `multer` is installed. If uploads are added later, ensure the server filesystem is writable.
