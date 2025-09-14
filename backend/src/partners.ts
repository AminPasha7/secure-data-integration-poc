import { api } from "encore.dev/api";
import { db } from "./db.js";
import type { UpsertPartnerReq, Partner } from "./types.js";

export const upsertPartner = api<UpsertPartnerReq, Partner>(
  { method: "POST", path: "/partners", expose: true },
  async (p) => {
    const row = await db.rawQueryRow<Partner>(
      `INSERT INTO partner (tenant_id, name, config)
       VALUES ($1::uuid, $2, COALESCE($3::jsonb, '{}'::jsonb))
       ON CONFLICT (tenant_id, name) DO UPDATE SET config = EXCLUDED.config
       RETURNING id, tenant_id, name, config, created_at`,
      p.tenant_id, p.name, p.config ? JSON.stringify(p.config) : null,
    );
    return row!;
  }
);
