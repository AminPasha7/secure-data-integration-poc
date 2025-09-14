import { api } from "encore.dev/api";
import { db } from "./db.js";
import type { CreateTenantReq, Tenant, ListTenantsRes } from "./types.js";

export const createTenant = api<CreateTenantReq, Tenant>(
  { method: "POST", path: "/tenants", expose: true },
  async ({ name }) => {
    const row = await db.rawQueryRow<Tenant>(
      "INSERT INTO tenant (name) VALUES ($1) RETURNING id, name, created_at",
      name,
    );
    return row!;
  }
);

export const listTenants = api<void, ListTenantsRes>(
  { method: "GET", path: "/tenants", expose: true },
  async () => {
    const rows = await db.rawQueryAll<Tenant>(
      "SELECT id, name, created_at FROM tenant ORDER BY created_at DESC"
    );
    return { items: rows };
  }
);
