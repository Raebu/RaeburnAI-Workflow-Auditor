create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin', 'auditor', 'viewer')),
  invited_by uuid not null references users(id) on delete restrict,
  token_hash text not null unique,
  accepted_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (organisation_id, email)
);

create index if not exists invitations_organisation_created_idx on invitations (organisation_id, created_at desc);
