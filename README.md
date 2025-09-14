# Secure Data Integration & Translation App (POC)

A production‑grade proof of concept for ingesting, validating, translating, and delivering partner data with strong security and operational guarantees.

---

## Architecture

<!-- Markdown embed -->
![Architecture Diagram — Data Integration POC](images/Architecture%20Diagram_%20Data%20Integration%20POC.png)

<!-- HTML fallback (GitHub supports this). If the Markdown line above doesn’t render, this one will. -->
<img src="images/Architecture%20Diagram_%20Data%20Integration%20POC.png" alt="Architecture Diagram — Data Integration POC" />

> The diagram file lives at `images/Architecture Diagram_ Data Integration POC.png`. Spaces are URL‑encoded as `%20` above.

### End‑to‑End Flow
1. **Ingestion**: Files arrive via Admin UI uploads or REST/webhook. Metadata and blob pointers are persisted.
2. **Validation & Normalization**: Content type/shape checks; payloads are normalized for parsing.
3. **Parsing**: Format‑specific parsers (CSV/JSON/XML/PDF) map fields into a **canonical domain model**.
4. **Partner Mapping**: Canonical entities are transformed via partner‑specific mappers and configuration.
5. **Translation & Delivery**: Payloads are emitted in the target format and delivered via HTTP/webhook or storage. Retries use backoff and are **idempotent**; failures land in a **DLQ**.
6. **Audit & Observability**: State changes and job events write to audit logs; traces/metrics available via Encore.

---

## Components
- **Backend – Encore.ts (TypeScript)**: Typed REST APIs, background jobs, outbound webhooks, observability hooks.
- **Frontend – Next.js + Tailwind + shadcn/ui**: Admin UI for uploads, queues, partner config, run history, triage.
- **Data – PostgreSQL**: Schemas for files/artifacts, partners/configs, agreements/claims, jobs, audit logs.
- **Security**: SOC2‑oriented practices—RBAC, least privilege, audit trails, secret management, input validation.
- **Reliability**: Durable queues, retries/backoff, idempotency keys, DLQs.

> **Modularity**: Parsers and partner mappers are plug‑in style. Add/replace without changing core queueing.

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- pnpm or npm (pnpm recommended)
- Docker Desktop (Postgres + Redis)
- Encore CLI (`brew install encoredev/tap/encore` or see docs)

### Start Infrastructure
```bash
docker compose -f infra/docker-compose.dev.yml up -d
```

### Backend (Encore)
```bash
cd backend
pnpm install
encore run
# Open the Encore local dev dashboard URL printed in the terminal.
```

### Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm dev
```

Open http://localhost:3000

---

## Repository Layout
```
backend/   # Encore.ts app
frontend/  # Next.js admin UI
infra/     # Docker Compose (Postgres/Redis), migrations
docs/      # Architecture, security, API contracts
.github/   # CI workflow (lint, typecheck, build, tests)
images/    # Diagrams & screenshots
```

---

## Operational Notes
- Background jobs are asynchronous workers triggered by ingestion events.
- Webhooks are emitted on lifecycle changes: received → validated → translated → delivered.
- Idempotency and retries are enabled across external side‑effects.

---

## Troubleshooting
- **Diagram not rendering**: Ensure the exact path and case match. The README uses `images/Architecture%20Diagram_%20Data%20Integration%20POC.png`. GitHub sometimes caches—refresh the page. The HTML fallback tag is included above.
- **Prefer no spaces in file names**: Optionally rename to `images/architecture-diagram.png` and update both links accordingly.
