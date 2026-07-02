# Production Deployment

## Required checks

Run before deployment:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
docker build -t raeburnai-workflow-auditor .
```

## Database

Saved audits and first-party authentication require Postgres. Apply migrations before deployment:

```bash
npm run db:migrate
```

Seed local demo users only in development:

```bash
npm run db:seed
```

Docker Compose starts Postgres and applies `db/schema.sql` automatically on first initialisation. For repeatable production upgrades, use `npm run db:migrate`.

## Authentication and RBAC

The app includes first-party workspace authentication:

- `/auth` login and registration UI
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Passwords are hashed with bcrypt. Sessions are signed JWTs stored in HTTP-only cookies. Set `AUTH_SECRET` to a long random value in production.

Supported roles:

- `owner`
- `admin`
- `auditor`
- `viewer`

Saved audit APIs enforce tenant scope and minimum role checks server-side.

## Vercel

1. Import the repository into Vercel.
2. Provision Postgres and set `DATABASE_URL`.
3. Set `AUTH_SECRET` and variables from `.env.example`.
4. Run `npm run db:migrate` against the production database.
5. Deploy from `main` after CI passes.
6. Confirm `/api/health` and `/api/ready` respond successfully.

## Docker

```bash
docker build -t raeburnai-workflow-auditor .
docker run -p 3000:3000 --env-file .env.local raeburnai-workflow-auditor
```

## Docker Compose

```bash
docker compose up --build
```

## Operational controls

- Store API keys and `AUTH_SECRET` in the platform secret manager.
- Do not log raw customer documents.
- Put public deployments behind TLS, WAF and platform-level rate limits.
- Review audit outputs before making staffing, compliance or financial decisions.
- Use human approval for any action that changes external systems.
- Use durable audit-event writes for enterprise deployments.

## TODO

- Add full browser E2E with Playwright once browser installation is configured in CI.
- Add account-management UI for inviting users and changing roles.
