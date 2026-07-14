import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import Database from "better-sqlite3";

const TEST_DB_PATH = join(process.cwd(), "test.db");
const MIGRATIONS_DIR = join(process.cwd(), "prisma", "migrations");

export default function globalSetup() {
  if (existsSync(TEST_DB_PATH)) {
    rmSync(TEST_DB_PATH);
  }

  const db = new Database(TEST_DB_PATH);
  const migrationFolders = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of migrationFolders) {
    const sqlPath = join(MIGRATIONS_DIR, folder.name, "migration.sql");
    const sql = readFileSync(sqlPath, "utf-8");
    db.exec(sql);
  }

  db.close();

  return () => {
    // Best-effort cleanup. On Windows the file can still be held open by a
    // Prisma connection from the test run, which would make this throw.
    try {
      if (existsSync(TEST_DB_PATH)) {
        rmSync(TEST_DB_PATH);
      }
    } catch {
      // Ignore — the next run's setup deletes it before reuse anyway.
    }
  };
}
