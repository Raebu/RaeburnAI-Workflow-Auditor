# Auth, RBAC and Database

## Auth model

Saved audit APIs use an upstream-authenticated user context passed through the `x-raeburn-user` header. The header value is base64url-encoded JSON.

Example decoded payload:

```json
{
  "id": "00000000-0000-4000-8000-000000000101",
  "email": "owner@example.com",
  "organisationId": "00000000-0000-4000-8000-000000000001",
  "role": "owner"
}
```

This is designed as an integration seam for Auth.js, Clerk, enterprise SSO or an API gateway. It avoids shipping a weak demo password system while still giving production APIs a real RBAC boundary.

## Roles

| Role | Access |
| --- | --- |
| `owner` | Full organisation-level access. |
| `admin` | Administrative access except ownership transfer. |
| `auditor` | Create and read audits. |
| `viewer` | Read audits only. |

## Database setup

```bash
createdb raeburnai_workflow_auditor
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
```

Docker Compose applies `db/schema.sql` automatically on first database initialisation. Apply `db/seed.sql` manually if you want demo users.

## Saved audit endpoints

```bash
GET /api/audits
GET /api/audits?id=<audit-id>
POST /api/audits
```

`POST /api/audits` requires at least the `auditor` role. `GET /api/audits` requires at least the `viewer` role.
