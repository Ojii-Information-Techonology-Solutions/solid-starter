import { Database } from "bun:sqlite";
import { isServer } from "solid-js/web";
import { runMigration } from "~/migrations/v1";

let db: Database | null = null;

export function getDatabase() {
  "use server";

  if (!isServer) {
    throw new Error("Database can only be accessed on the server");
  }

  if (!db) {
    db = new Database("app.db");
    db.exec("PRAGMA journal_mode = WAL;");
    runMigration(db);
  }

  return db;
}
