import { readFile } from 'node:fs/promises';
import path from 'node:path';
import postgres from 'postgres';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is required to seed the database.');

  const sql = postgres(databaseUrl, { max: 1, prepare: false });
  const content = await readFile(path.join(process.cwd(), 'db', 'seed.sql'), 'utf8');
  await sql.unsafe(content);
  await sql.end();
  console.info('Seed data applied');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
