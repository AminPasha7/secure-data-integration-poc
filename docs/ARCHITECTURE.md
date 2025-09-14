# Architecture

## High-Level
- **Ingestion Service**: Accepts file uploads (CSV/XLSX/XML/JSON/EDI) via REST and pre-validates metadata.
- **Validation/Translation Workers**: Parse, validate schemas, normalize, and map to partner-specific outputs.
- **Delivery**: Writes artifacts to Postgres (large payloads go to object storage in prod), triggers webhooks.
- **Admin UI**: Upload portal, queue monitor, partner configs, error triage, analytics.
- **Security**: RBAC, audit logs, signed URLs for upload/download, secrets manager, rate limits, input validation.

## Reliability
- Idempotent job keys (sha256 of content + partner + version)
- Exponential backoff, max attempts, DLQ table
- Transactional outbox for webhook events

## Multi-Tenancy
- Tenant_id on every table, RLS policies (Postgres) — disabled by default in POC, ready to enable.
