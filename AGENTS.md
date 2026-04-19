# AGENTS.md

## Project Structure

**Job Journal** is a full-stack Cloudflare Workers + React application for tracking job applications.

- **Frontend**: React 19 + Vite + TanStack (Router, Query, Form, Table) in `src/` (except `src/worker/`)
- **Backend**: Hono API running on Cloudflare Workers at `src/worker/`
- **Database**: PostgreSQL via Neon, accessed through Cloudflare Hyperdrive binding
- **Generated files**: `src/routeTree.gen.ts` (TanStack Router) and `worker-configuration.d.ts` (Wrangler types)

Three separate tsconfig files: `tsconfig.app.json` (frontend), `tsconfig.node.json` (build tools), `tsconfig.worker.json` (backend).

## Key Commands

```bash
pnpm dev              # Dev server (Vite only; Wrangler runs separately)
pnpm build            # TypeScript check + Vite build
pnpm check            # Full validation: TypeScript + build + dry-run deploy
pnpm lint             # ESLint check
pnpm test             # Vitest (jsdom environment)
pnpm deploy           # Deploy to Cloudflare Workers
pnpm cf-typegen       # Regenerate worker-configuration.d.ts from wrangler.jsonc
pnpm db:push          # Push schema to dev DB (uses CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE)
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run Drizzle migrations
```

## Environment Variables

**Must keep in sync:**

- `.env.local` / `.env.production` files
- `wrangler.jsonc` (for Cloudflare bindings and secrets)
- See `ENV_UPDATES/` folder for consolidated reference templates

**Key variables:**

- `VITE_NEON_AUTH_URL` — Neon Auth endpoint (exposed to browser, `VITE_` prefix)
- `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE` — Local PostgreSQL URL for dev/migrations (required for Drizzle config)

**Bindings (wrangler.jsonc):**

- `HYPERDRIVE` — Cloudflare Hyperdrive PostgreSQL binding (production)
- `NEON_AUTH` — Cloudflare Secrets Store for auth URL (production)

## Database & Migrations

- Schema defined in `src/worker/db/schema.ts`
- Drizzle config reads `process.env.CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE` (requires `.env.local`)
- `wrangler.jsonc` has `nodejs_compat_populate_process_env: true` to enable this
- Migrations go in `drizzle/` directory
- Local dev uses direct PostgreSQL; production uses Hyperdrive binding

## Authentication

- Neon Auth JWT-based
- Worker reads `VITE_NEON_AUTH_URL` from `.env.local` in dev, from Secrets Store in production (`src/worker/index.ts`)
- Client initializes auth client with `import.meta.env.VITE_NEON_AUTH_URL`

## Router Generation & Type Safety

- TanStack Router auto-generates `src/routeTree.gen.ts` on build
- Do not edit `routeTree.gen.ts` or `worker-configuration.d.ts` directly
- Regenerate types after config changes: `pnpm cf-typegen` (Wrangler) or rebuild (Router)
- ESLint ignores these files

## Testing

- Test environment: jsdom (browser-like)
- Setup file: `src/vitest.setup.ts`
- Coverage config in `vitest.config.ts` excludes `*.d.ts` and test files themselves
- Reporter outputs: text, json, html (in `coverage/`)

## Lint & Format

- ESLint config in `eslint.config.js` (flat config format)
- Prettier config: 2-space tabs, trailing commas (es5), double quotes, semicolons
- No pre-commit hooks configured

## Deployment Quirks

- **`pnpm check`** runs a dry-run deploy; use this before real deploy to catch issues
- Build output: Vite client bundle in `dist/client/`, Worker entry in `dist/` (via Cloudflare Vite plugin)
- `wrangler.jsonc` assets directory points to `./dist/client` with SPA fallback
- Production `VITE_NEON_AUTH_URL` is in `wrangler.jsonc` under `env.production.vars` — must match the actual secret in Cloudflare dashboard
