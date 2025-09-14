# Secure Data Integration & Translation App (POC)
Production-grade POC for an integration/data translation platform:
- **Backend:** Encore.ts (TypeScript) — typed REST APIs, background jobs, webhooks, observability
- **Frontend:** Next.js + Tailwind + shadcn/ui — admin UI (uploads, queues, partner configs, triage)
- **Data:** PostgreSQL — schemas for files/artifacts, partner configs, agreements/claims, audit logs
- **Security:** SOC2-ready practices (RBAC, least-privilege, audit trails, secrets, input validation)
- **Reliability:** Durable queues, retries/backoff, idempotency, DLQs

## Quick Start (Local Dev)
### Prereqs
- Node.js 20+
- pnpm or npm (pnpm recommended)
- Docker Desktop (for Postgres + Redis)
- Encore CLI (`brew install encoredev/tap/encore` or see docs)

### Boot services
```bash
docker compose -f infra/docker-compose.dev.yml up -d
```

### Backend (Encore)
```bash
cd backend
pnpm install
# First run will create Encore metadata; then
encore run
# Open Encore local dev dashboard URL that prints in the terminal.
```

### Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm dev
```

Open http://localhost:3000

## Repo Structure
```
backend/   # Encore.ts app
frontend/  # Next.js admin UI
infra/     # Docker Compose (Postgres/Redis), migrations
docs/      # Architecture, security, API contracts
.github/   # CI workflow (lint, typecheck, build, tests)
```

## Notes
- This POC is **modular**: you can swap parsers or add partner mappers without touching core queueing.
- Encore background jobs: implemented as async workers triggered by ingestion events; retries & idempotency included.
- Webhooks: outbound events for state changes (received, validated, translated, delivered).
