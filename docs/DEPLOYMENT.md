# Production Deployment

## Required checks

Run before deployment:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:browser
docker build -t raeburnai-workflow-auditor .
```

## Database

Saved audits, first-party authentication, invitations and durable audit events require Postgres. Apply migrations before deployment:

```bash
npm run db:migrate
```

Seed local demo users only in development:

```bash
npm run db:seed
```

Docker Compose starts Postgres and applies `db/schema.sql` automatically on first initialisation. For repeatable production upgrades, use `npm run db:migrate`.

## Authentication, RBAC and account management

The app includes first-party workspace authentication and account administration:

- `/auth` login and registration UI
- `/account` user invite, role management and audit-event UI
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/account/users`
- `POST /api/account/users`
- `PATCH /api/account/users`
- `GET /api/account/audit-events`

Passwords are hashed with bcrypt. Sessions are signed JWTs stored in HTTP-only cookies. Set `AUTH_SECRET` to a long random value in production.

Supported roles:

- `owner`
- `admin`
- `auditor`
- `viewer`

Saved audit and account APIs enforce tenant scope and minimum role checks server-side.

## Browser E2E

Playwright runs in CI with Chromium. To run locally:

```bash
npx playwright install chromium
npm run test:browser
```

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
- Review durable audit events regularly through `/account`.

## TODO

- Add invite acceptance email delivery provider.
- Add advanced account lifecycle controls such as suspend and delete user.
