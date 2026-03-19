# BuyWise

A price comparison web app that lets users search for a product and instantly see current prices across multiple retailers, so they can buy from the cheapest source.
No account required to browse; sign in to save items for comparison.

---

## What's in this repo

```
client/   React frontend (Create React App)
server/   Node.js + Express backend API
```

### Frontend features (client/)
- Homepage with hero search bar
- Login and registration pages with show/hide password toggle and redirect-back behaviour
- About page with team info
- Shared nav with login state (shows username when signed in)
- Saved Comparisons sidebar — slide-in panel that persists across pages via localStorage
- CSS design tokens (custom properties) for consistent colours and spacing

### Backend features (server/)
- Express server on port 8080
- Session-based auth (bcrypt + express-session stored in PostgreSQL)
- Proxy routes for the external Prices API — keeps the API key server-side and out of the browser
- PostgreSQL connection via `pg`

### API endpoints

| Method | Path                       | Description                                          |
| ------ | -------------------------- | ---------------------------------------------------- |
| POST   | `/api/register`            | Create account `{ username, password }` → `{ user }` |
| POST   | `/api/login`               | Sign in `{ username, password }` → `{ user }`        |
| POST   | `/api/logout`              | Destroy session                                      |
| GET    | `/api/me`                  | Return current session user or 401                   |
| GET    | `/api/search?q=`           | Search products via Prices API                       |
| GET    | `/api/products/:id/offers` | Get price offers for a product                       |

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool           | Version         | Install                                        |
| -------------- | --------------- | ---------------------------------------------- |
| Node.js        | 18 or higher    | https://nodejs.org                             |
| npm            | comes with Node | —                                              |
| Docker Desktop | latest          | https://www.docker.com/products/docker-desktop |

---

## Getting started

### 1. Clone the repo

```bash
git clone <repo-url>
cd OnlineShoppingCart-main
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=shopping_cart
PRICES_API_KEY=your_prices_api_key_here
SESSION_SECRET=a_long_random_string
```

> The `.env` file is gitignored — never commit real credentials.

### 3. Start the database

```bash
docker compose up db -d
```

This starts a PostgreSQL container on `localhost:5432`. The tables below are created automatically on first startup via `server/init.sql`.

**`users`**
| Column        | Type        | Notes            |
| ------------- | ----------- | ---------------- |
| id            | SERIAL      | Primary key      |
| username      | VARCHAR(50) | Unique, not null |
| password_hash | TEXT        | bcrypt hash      |
| created_at    | TIMESTAMP   | Defaults to now  |

**`session`** — managed automatically by the server; do not modify manually.

You can stop the database later with `docker compose down`.

### 4. Start the backend server

```bash
cd server
npm install
node index.js
```

Server runs at **http://localhost:8080**

### 5. Start the frontend (in a separate terminal)

```bash
cd client
npm install
npm start
```

Frontend runs at **http://localhost:3000** and automatically proxies `/api/*` requests to the server — no CORS issues during development.

---

## Running both together (quick reference)

```bash
# Terminal 1 — database
docker compose up db -d

# Terminal 2 — server
cd server && node index.js

# Terminal 3 — client
cd client && npm start
```

---

## Team

| Name            | Role                                   |
| --------------- | -------------------------------------- |
| Ivan Chiu       | Backend / Application Logic            |
| Tony You        | Frontend / UI Design                   |
| Isabella George | User Experience, Testing & Integration |
| Kledja Caushi   | Auth, Search & UI, Project Setup       |
