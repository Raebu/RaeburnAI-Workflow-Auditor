insert into organisations (id, name)
values ('00000000-0000-4000-8000-000000000001', 'Demo Organisation')
on conflict do nothing;

insert into users (id, organisation_id, email, role)
values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'owner@example.com', 'owner'),
  ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'auditor@example.com', 'auditor'),
  ('00000000-0000-4000-8000-000000000103', '00000000-0000-4000-8000-000000000001', 'viewer@example.com', 'viewer')
on conflict do nothing;
