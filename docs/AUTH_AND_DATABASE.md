# Auth, RBAC and Database

## Auth model

RaeburnAI Workflow Auditor includes first-party workspace authentication:

- `POST /api/auth/register` creates an organisation and owner account.
- `POST /api/auth/login` verifies email and password credentials.
- `POST /api/auth/logout` clears the session cookie.
- `GET /api/auth/session` returns the current signed-in user.
- `/auth` provides the login and registration UI.

Passwords are hashed with bcrypt. Sessions are signed JWTs stored in HTTP-only cookies using `AUTH_SECRET`.

## Roles

| Role | Access |
| --- | --- |
| `owner` | Full organisation-level access. |
| `admin` | Invite users, change roles, view audit events and administer the workspace. |
| `auditor` | Create and read audits. |
| `viewer` | Read audits only. |

Saved audit and account APIs enforce role checks server-side and scope reads/writes to the signed-in user's organisation.

## Account management

`/account` provides a workspace admin UI for:

- inviting users
- assigning `admin`, `auditor` or `viewer` roles
- changing non-owner user roles
- viewing durable security audit events

APIs:

```bash
GET /api/account/users
POST /api/account/users
PATCH /api/account/users
GET /api/account/audit-events
```

## Durable audit events

Security-sensitive actions are written to the `audit_events` table, including:

- registration
- login
- logout
- saved audit creation
- saved audit reads/lists
- user invitations
- role changes

## Database setup

```bash
createdb raeburnai_workflow_auditor
npm run db:migrate
npm run db:seed
```

Docker Compose applies `db/schema.sql` automatically on first database initialisation. For repeatable production upgrades, use `npm run db:migrate`.

## Demo users

After `npm run db:seed`, these demo users are available with password `ChangeMeSecurely123!`:

- `owner@example.com`
- `auditor@example.com`
- `viewer@example.com`

Change or remove demo users before production deployment.

## Saved audit endpoints

```bash
GET /api/audits
GET /api/audits?id=<audit-id>
POST /api/audits
```

`POST /api/audits` requires at least the `auditor` role. `GET /api/audits` requires at least the `viewer` role.
