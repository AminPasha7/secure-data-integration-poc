import { api } from "encore.dev/api";
import { db } from "./db.js";
import type { GetJobReq, TriggerJobsReq, GetJobRes, Job } from "./types.js";

export const getJob = api<GetJobReq, GetJobRes>(
  { method: "GET", path: "/jobs/:id", expose: true },
  async ({ id }) => {
    const row = await db.rawQueryRow<Job>("SELECT * FROM job WHERE id = $1::uuid", id);
    return { job: row ?? null };
  }
);

export const triggerJobs = api<TriggerJobsReq, { processed: number }>(
  { method: "POST", path: "/jobs/trigger", expose: true },
  async () => {
    const rows = await db.rawQueryAll<{ id: string }>(
      "SELECT id FROM job WHERE status = 'queued' ORDER BY created_at ASC LIMIT 10"
    );
    for (const r of rows) {
      await db.rawExec("UPDATE job SET status = 'succeeded', updated_at = NOW() WHERE id = $1::uuid", r.id);
    }
    return { processed: rows.length };
  }
);
