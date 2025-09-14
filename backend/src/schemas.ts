import { z } from "zod";

export const UploadMeta = z.object({
  tenant_id: z.string().uuid(),
  partner_id: z.string().uuid().optional(),
  filename: z.string().min(1),
  mime_type: z.string().min(1),
  bytes: z.number().int().positive(),
  content_base64: z.string().min(1),
  source: z.string().optional().default("api"),
  correlation_id: z.string().optional()
});

export const JobStatusReq = z.object({
  id: z.string().uuid()
});
