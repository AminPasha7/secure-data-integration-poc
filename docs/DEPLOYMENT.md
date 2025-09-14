# Deployment, Security & Coding Best Practices

## Deployment
- Managed Postgres (encryption at rest, PITR).
- TLS behind reverse proxy (HTTP/2) + HSTS.
- Separate worker (cron or long-running) for queue processing.
- Health checks: `/healthz` for liveness/readiness.
- Object storage (S3/MinIO) with signed URLs for large files.
- Immutable, scanned images (SBOM, Trivy); static analysis (CodeQL).
- Blue/green or canary; apply DB migrations before cutover.

## Security
- RBAC + per-tenant scoping; enable Postgres RLS in prod.
- Secrets via KMS/Vault/Secret Manager; regular rotation.
- Strict CSP, X-Frame-Options DENY, nosniff, Referrer-Policy.
- Zod input validation; rate/file-size limits at the edge.
- Audit logs for sensitive/admin actions.
- Dependabot/Renovate; lockfiles; timely patching.
- Backups + restore drills.

## Coding
- TS strict, ESLint, Prettier; CI gates (typecheck/build/tests).
- Structured JSON logs with correlation IDs.
- Idempotent jobs; retries/backoff; DLQ.
- Tests for parsers/mappers; integration tests for ingestion & queue.
- Versioned mapping specs (ETIM/UNSPSC/etc).
