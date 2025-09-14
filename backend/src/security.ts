import { db } from "./db.js";

export async function audit(
  actor: string,
  action: string,
  tenantId?: string,
  entity?: string,
  entityId?: string,
  metadata?: Record<string, unknown>
) {
  await db.rawExec(
    `INSERT INTO audit_log (tenant_id, actor, action, entity, entity_id, metadata)
     VALUES ($1::uuid, $2, $3, $4, $5, $6::jsonb)`,
    tenantId ?? null,
    actor,
    action,
    entity ?? null,
    entityId ?? null,
    metadata ? JSON.stringify(metadata) : null
  );
}
