import { api } from "encore.dev/api";
import { db } from "./db.js";
import { audit } from "./security.js";
import { createHash } from "node:crypto";
import type { UploadReq, FileRow } from "./types.js";

export const upload = api<UploadReq, { file_id: string; status: "queued" }>(
  { method: "POST", path: "/ingest/upload", expose: true },
  async (p) => {
    const buf = Buffer.from(p.content_base64, "base64");
    const sha256 = createHash("sha256").update(buf).digest("hex");

    const row = await db.rawQueryRow<FileRow>(
      `INSERT INTO file_ingest (tenant_id, partner_id, filename, mime_type, bytes, sha256, status)
       VALUES ($1::uuid, $2::uuid, $3, $4, $5, $6, 'received')
       RETURNING id, tenant_id, partner_id, filename, mime_type, bytes, sha256, status, created_at`,
      p.tenant_id, p.partner_id ?? null, p.filename, p.mime_type, p.bytes, sha256,
    );

    await audit("system", "file_received", p.tenant_id, "file_ingest", row!.id);

    const idem = "parse:" + row!.id;
    await db.rawExec(
      `INSERT INTO job (file_id, tenant_id, kind, idempotency_key, status)
       VALUES ($1::uuid, $2::uuid, 'parse', $3, 'queued')`,
      row!.id, p.tenant_id, idem,
    );

    return { file_id: row!.id, status: "queued" as const };
  }
);
