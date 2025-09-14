# API Contracts (Encore.ts)

## POST /ingest/upload
- multipart/form-data or JSON with base64 payload
- params: partner_id, file_type, source, correlation_id?
- returns: { file_id, job_id, status }

## GET /jobs/:id
- returns job status/history, attempts, errors

## POST /partners
- create/update partner mapping and preferences

## POST /webhooks/test
- triggers a sample webhook for endpoint verification
