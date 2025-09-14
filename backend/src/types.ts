export interface CreateTenantReq { name: string; }

export interface UploadReq {
  tenant_id: string;
  partner_id?: string | null;
  filename: string;
  mime_type: string;
  bytes: number;
  content_base64: string;
  source?: string;
  correlation_id?: string;
}

export interface UpsertPartnerReq {
  tenant_id: string;
  name: string;
  config?: Record<string, unknown>;
}

export interface TriggerJobsReq {}
export interface GetJobReq { id: string; }
export interface TestWebhookReq { tenant_id: string; target_url: string; }

/** Named response wrappers (Encore prefers named interfaces) */
export interface GetJobRes { job: Job | null; }
export interface ListTenantsRes { items: Tenant[]; }

/** Entities */
export interface Tenant { id: string; name: string; created_at: string; }
export interface Partner { id: string; tenant_id: string; name: string; config: unknown; created_at: string; }
export interface Job { id: string; file_id: string; tenant_id: string; kind: string; status: string; attempts: number; last_error: string | null; }
export interface FileRow {
  id: string; tenant_id: string; partner_id: string | null;
  filename: string; mime_type: string; bytes: number; sha256: string;
  status: string; created_at: string;
}
