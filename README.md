<p align="center">
  <img src="./public/logo.png" width="200">
</p>

<p align="center">
  <img src="./public/screenshot.png">
</p>

Track, organize, and manage your job applications through every stage of the hiring pipeline—all in one searchable, filterable dashboard.

**[🚀 Live Demo](https://jobjournal.corymhayes-017.workers.dev/)** • **[Features](#features)** • **[Tech Stack](#tech-stack)** • **[Getting Started](#quick-start)** • **[API Docs](#api-reference)**


---

## 📑 Quick Navigation

| Section | Link |
|---------|------|
| Overview | [Read](#overview) |
| Features | [View](#features) |
| Tech Stack | [Explore](#tech-stack) |
| Quick Start | [Setup](#quick-start) |
| API Reference | [Docs](#api-reference) |
| Deployment | [Deploy](#deployment) |
| Testing | [Test](#running-tests) |

---

## Overview

Applying for jobs is a numbers game and managing dozens of applications across different companies, stages, and timelines can quickly become overwhelming. **Job Journal** consolidates all your job applications into a single, filterable, sortable dashboard so you can focus on what matters: landing your next role.

Whether you're applying to 5 companies or 50, this full-stack application helps you:

- 📊 **Track progress** from initial submission through offer negotiation
- ⏱️ **Monitor timelines** with automatic elapsed-time calculations  
- 🗂️ **Organize smartly** by company, role, work style, and pipeline status
- 📈 **Gain insights** with real-time statistics on application rates and response metrics

Perfect for job seekers, career changers, and anyone running an active job search.

---

## Features

- 🎯 **Full CRUD Operations** — Create, read, update, and delete applications with a single click
- 📊 **8-Stage Pipeline Tracking** — Applied → Recruiter Screen → Initial Interview → Technical Interview → Final Interview → Offer → Rejected → Withdrawn
- 🔍 **Smart Sorting & Filtering** — Sort by any column and filter by company
- ⏱️ **Automatic Time Tracking** — Days elapsed counter updates in real-time
- 📈 **Dashboard Analytics** — Response rates, monthly trends, and pipeline distribution at a glance
- 🎨 **Dark/Light Mode** — Eye-friendly theme toggle for any lighting condition
- 📱 **Fully Responsive** — Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Instant Sync** — Real-time updates across all browser tabs using React Query
- 🔐 **User Authentication** — Secure JWT-based auth with Neon Auth

---

## Tech Stack

### Frontend
| Frontend | Backend | Infrastructure |
|---------|---------|---------|
| React 19 | Hono | Cloudflare Workers 
| Vite | Drizzle ORM | Hyperdrive |
| TanStack Form | PostrgreSQL | Neon
| TanStack Query | Zod | Neon Auth
| TanStack Router | Jose 
| TanStack Table 
| Tailwind CSS
| Zod 
| shadcn/ui

---

## Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ (or 20 LTS recommended)
- **pnpm** 8+ (or npm/yarn if preferred)
- **Git** for version control
- **PostgreSQL 14+** (Neon account recommended for managed hosting)
- **Cloudflare Account** (for Workers deployment)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/corymhayes/job-journal.git
cd job-journal
```

#### 2. Install dependencies

```bash
pnpm install
```

#### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE=postgres://user:password@host:port/database
VITE_NEON_AUTH_URL=https://your-neon-auth-endpoint.neon.tech
```

**How to get Neon Auth URL:**
1. Go to [Neon Console](https://console.neon.tech)
2. Navigate to your project's Auth settings
3. Copy the Auth endpoint URL


#### 3. Set up wrangler

Create a `wrangler.jsonc` file in the project root:

```json
/**
 * For more details on how to configure Wrangler, refer to:
 * https://developers.cloudflare.com/workers/wrangler/configuration/
 */
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "jobjournal",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2026-03-19",
  "compatibility_flags": [
    "nodejs_compat",
    "nodejs_compat_populate_process_env",
  ],
  "observability": {
    "enabled": true,
  },
  "upload_source_maps": true,
  "assets": {
    "directory": "./dist/client",
    "not_found_handling": "single-page-application",
  },
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "YOUR_HYPERDRIVE_ID",
    },
  ],
}

```

**How to get Hyperdrive ID:**
1. Go to your [Cloudflare Dashboard](https://dash.cloudlflare.com)
2. Find Hyperdrive under Storage & databases
3. Create a new configuration with your Neon connection string (be sure to disable caching)

#### 4. Push database configuration
```bash
pnpm run db:push
```

#### 5. Start the development server
```bash
pnpm run dev
```

The app will be available at **`http://localhost:5173`**

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE` | ✅ | Local Backend API URL (frontend) | `postgres://user:password@host:port/database` |
| `VITE_NEON_AUTH_URL` | ✅ | Neon Auth endpoint | `https://your-neon-auth-endpoint.neon.tech` |

---

## API Reference

The backend exposes a **RESTful API** protected by JWT authentication. All requests require an `Authorization: Bearer <token>` header.

### Authentication

All API endpoints require a valid JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  https://localhost:5173/api
```

---

### GET /api

Retrieve all applications for the authenticated user.

**Request:**
```bash
curl -H "Authorization: Bearer <token>" \
  https://localhost:5173/api
```

**Response (200 OK):**
```json
{
  "ok": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "company": "Acme Corp",
      "job": "Senior Engineer",
      "status": "Technical Interview",
      "work_style": "Remote",
      "application_url": "https://acme.com/careers/123",
      "date_applied": "2024-01-15",
      "date_response": "2024-01-20",
      "user_id": "user-uuid"
    }
  ]
}
```

---

### POST /api

Create a new job application.

**Request:**
```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Tech Startup",
    "job": "Full Stack Engineer",
    "status": "Applied",
    "work_style": "Hybrid",
    "application_url": "https://startup.com/jobs/456",
    "date_applied": "2024-02-10",
    "date_response": null
  }' \
  https://localhost:5173/api
```

**Request Body Schema:**
```typescript
{
  company: string              // max 100 chars, required
  job: string                  // max 100 chars, required
  status: "Applied" | 
          "Recruiter Screen" | 
          "Initial Interview" | 
          "Technical Interview" | 
          "Final Interview" | 
          "Offer" | 
          "Rejected" | 
          "Withdrawn"           // required
  work_style: "Remote" | 
              "Onsite" | 
              "Hybrid"          // required
  application_url: string | null  // optional
  date_applied: string         // ISO date (YYYY-MM-DD), required
  date_response: string | null // ISO date, optional
}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

---

### PUT /api/:id

Update an existing application.

**Request:**
```bash
curl -X PUT \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Tech Startup",
    "job": "Full Stack Engineer",
    "status": "Technical Interview",
    "work_style": "Hybrid",
    "application_url": "https://startup.com/jobs/456",
    "date_applied": "2024-02-10",
    "date_response": "2024-02-15"
  }' \
  https://localhost:5173/api/550e8400-e29b-41d4-a716-446655440000
```

**Parameters:**
- `id` (path, required): UUID of the application to update

**Response (200 OK):**
```json
{
  "success": true
}
```

---

### DELETE /api/:id

Delete an application.

**Request:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer <token>" \
  https://localhost:5173/api/550e8400-e29b-41d4-a716-446655440000
```

**Parameters:**
- `id` (path, required): UUID of the application to delete

**Response (200 OK):**
```json
{
  "success": true
}
```

---

### GET /api/stats

Retrieve analytics and statistics for all applications.

**Request:**
```bash
curl -H "Authorization: Bearer <token>" \
  https://localhost:5173/api/stats
```

**Response (200 OK):**
```json
{
  "ok": true,
  "stats": {
    "applications_in_month": {
      "numberOfApps": 12,
      "percentageChange": 
    },
    "response_rate": {
      "currentResponses": 65,
      "total": 20
    },
    "in_progress": {
      "inProgress": 5
    },
    "pipeline": [
      { "name": "Applied", "value": 8, "percentage": 40 },
      { "name": "Recruiter Screen", "value": 5, "percentage": 25 },
      { "name": "Technical Interview", "value": 4, "percentage": 20 },
      { "name": "Final Interview", "value": 2, "percentage": 10 },
      { "name": "Offer", "value": 1, "percentage": 5 },
      { "name": "Rejected", "value": 3, "percentage": 0 },
      { "name": "Withdrawn", "value": 1, "percentage": 0 },
      { "name": "Initial Interview", "value": 0, "percentage": 0 }
    ]
  }
}
```

---

## Deployment

### Database Setup (Neon)

1. Create a PostgreSQL project on [Neon Console](https://console.neon.tech)
2. Copy the connection string
3. Run migrations:
   ```bash
   pnpm run db:migrate --remote
   ```
4. Add `DATABASE_URL` to Wrangler secrets

### Deploy to Cloudflare Workers

#### 1. Authenticate with Wrangler

```bash
pnpm wrangler login
```

#### 2. Set production environment variables

```bash
pnpm wrangler hyperdrive create <name> --connection-string=<neon connection string> --caching-disabled
```

#### 3. Build and deploy

```bash
pnpm run deploy
```

#### 4. Verify deployment

Visit your deployed URL (typically `https://your-project-name.your-subdomain.workers.dev`)

### Continuous Deployment (Optional)

Connect your GitHub repo to Cloudflare for automatic deploys:

1. Go to **Cloudflare Dashboard** → **Pages**
2. Select **"Connect to Git"**
3. Select this repository
4. Set **Build command**: `pnpm run build`
5. Set **Publish directory**: `dist`

---

## Running Tests

### Run all tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test --watch
```

### Run tests with UI

```bash
pnpm test:ui
```

Opens a browser-based dashboard at `http://localhost:51204/__vitest__/`

### Generate coverage report

```bash
pnpm test:coverage
```

Creates an HTML report in `coverage/`
---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Contribution Standards

- Write clear commit messages
- Add tests for new features
- Follow the existing code style (ESLint will help)
- Update documentation as needed

---

## Support

Have questions or found a bug? Let me know!

- **Issues**: [GitHub Issues](https://github.com/corymhayes/job-journal/issues)
- **Email**: [corymhayes@gmail.com](mailto:corymhayes@gmail.com)

---
