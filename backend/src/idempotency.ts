import { createHash } from "crypto";
export const sha256 = (buf: Buffer | string) => createHash("sha256").update(buf).digest("hex");

export function jobKey(kind: string, tenant: string, partner: string | undefined, sha: string) {
  return `${tenant}:${partner ?? "none"}:${kind}:${sha}`;
}
