import bcrypt from 'bcryptjs';
import postgres from 'postgres';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is required to seed the database.');

  const sql = postgres(databaseUrl, { max: 1, prepare: false });
  const passwordHash = await bcrypt.hash('ChangeMeSecurely123!', 12);

  await sql`
    insert into organisations (id, name)
    values ('00000000-0000-4000-8000-000000000001', 'Demo Organisation')
    on conflict do nothing
  `;

  await sql`
    insert into users (id, organisation_id, email, name, password_hash, role)
    values
      ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'owner@example.com', 'Owner User', ${passwordHash}, 'owner'),
      ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000001', 'auditor@example.com', 'Auditor User', ${passwordHash}, 'auditor'),
      ('00000000-0000-4000-8000-000000000103', '00000000-0000-4000-8000-000000000001', 'viewer@example.com', 'Viewer User', ${passwordHash}, 'viewer')
    on conflict (organisation_id, email) do update set password_hash = excluded.password_hash, name = excluded.name, role = excluded.role
  `;

  await sql.end();
  console.info('Seed data applied');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
