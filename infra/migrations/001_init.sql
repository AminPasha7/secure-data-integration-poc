-- core tables
create table if not exists tenant (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists partner (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenant(id),
  name text not null,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists file_ingest (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenant(id),
  partner_id uuid references partner(id),
  filename text not null,
  mime_type text not null,
  bytes int not null,
  sha256 char(64) not null,
  status text not null default 'received', -- received|validated|translated|delivered|failed
  error text,
  created_at timestamptz not null default now()
);

create index on file_ingest (tenant_id, partner_id, status);

create table if not exists job (
  id uuid primary key default gen_random_uuid(),
  file_id uuid not null references file_ingest(id),
  tenant_id uuid not null references tenant(id),
  kind text not null, -- validate|translate|deliver
  attempts int not null default 0,
  max_attempts int not null default 5,
  status text not null default 'queued', -- queued|running|succeeded|failed|dlq
  idempotency_key text not null,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index on job (idempotency_key);

create table if not exists audit_log (
  id bigserial primary key,
  tenant_id uuid,
  actor text not null,
  action text not null,
  entity text,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists webhook_outbox (
  id bigserial primary key,
  tenant_id uuid not null,
  event text not null,
  payload jsonb not null,
  target_url text not null,
  attempts int not null default 0,
  max_attempts int not null default 8,
  status text not null default 'pending',
  last_error text,
  created_at timestamptz not null default now()
);
