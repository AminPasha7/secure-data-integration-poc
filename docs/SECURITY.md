# Security & SOC-2 Readiness

- **RBAC**: Roles `admin`, `ops`, `viewer` persisted in DB; middleware checks on every request.
- **Least privilege**: Scoped API keys per tenant; row-level filtering (optional RLS).
- **Audit**: `audit_log` table tracks who/what/when, immutable append-only.
- **Encryption**: TLS in transit (terminator/proxy), at-rest via volume encryption (prod); secrets via environment or secret store.
- **Input validation**: Zod schemas on all endpoints; file type whitelists; size limits; rate limits.
- **Secrets**: `.env` for local only; vault/KMS recommended in prod.
