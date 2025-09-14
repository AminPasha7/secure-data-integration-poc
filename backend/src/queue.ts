import { db } from "./db.js";

type JobInput = {
  kind: "validate" | "translate" | "deliver";
  file_id: string;
  tenant_id: string;
  idempotency_key: string;
};

export async function queueJob(input: JobInput) {
  try {
    await db.exec`insert into job (file_id, tenant_id, kind, idempotency_key) values
      (${input.file_id}::uuid, ${input.tenant_id}::uuid, ${input.kind}, ${input.idempotency_key})`;
  } catch (e: any) {
    // Unique violation means it's already queued (idempotent insert)
    if (!/unique/i.test(String(e?.message))) throw e;
  }
}

// Simple worker loop (Encore runs services as processes; this can be triggered on a schedule via cron in prod)
// For POC, call processQueue() via a protected API or Encore Cron later.
export async function processQueueOnce() {
  const { rows } = await db.query(`
    update job set status='running', attempts = attempts + 1, updated_at = now()
    where id in (select id from job where status='queued' order by created_at asc limit 10 for update skip locked)
    returning id, kind, file_id, tenant_id, attempts, max_attempts
  `);

  for (const j of rows) {
    try {
      // TODO: fetch file, parse/validate/translate
      await db.exec`update job set status='succeeded', updated_at=now() where id=${j.id}::uuid`;
    } catch (err: any) {
      const attempts = Number(j.attempts) + 1;
      const status = attempts >= Number(j.max_attempts) ? 'dlq' : 'queued';
      await db.exec`update job set status=${status}, last_error=${String(err)}, updated_at=now() where id=${j.id}::uuid`;
    }
  }
  return { processed: rows.length };
}
