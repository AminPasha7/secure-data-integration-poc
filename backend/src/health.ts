import { api } from "encore.dev/api";
import { db } from "./db.js";

export const health = api<void, { ok: boolean }>(
  { method: "GET", path: "/healthz", expose: true },
  async () => {
    await db.rawQueryRow<{ one: number }>("select 1 as one");
    return { ok: true };
  }
);
