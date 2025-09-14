import { api } from "encore.dev/api";
import { db } from "./db.js";
import type { TestWebhookReq } from "./types.js";

export const testWebhook = api<TestWebhookReq, { enqueued: boolean }>(
  { method: "POST", path: "/webhooks/test", expose: true },
  async ({ tenant_id, target_url }) => {
    await db.rawExec(
      `INSERT INTO webhook_outbox (tenant_id, event, payload, target_url)
       VALUES ($1::uuid, 'test', '{"ok":true}'::jsonb, $2)`,
      tenant_id, target_url
    );
    return { enqueued: true };
  }
);
