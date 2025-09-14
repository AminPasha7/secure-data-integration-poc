import { api } from "encore.dev/api";
import { db } from "./db.js";
import type { Job } from "./types.js";

export const listJobs = api<void, { items: Job[] }>(
  { method: "GET", path: "/jobs", expose: true },
  async () => {
    const rows = await db.rawQueryAll<Job>(
      "SELECT id, file_id, tenant_id, kind, attempts, status, last_error FROM job ORDER BY created_at DESC LIMIT 25"
    );
    return { items: rows };
  }
);
