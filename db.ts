// db.ts
import Database from 'better-sqlite3';

const db = new Database('testdb.db');

// Optional: initialize tables here once
export function initializeDatabase() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      birthYear INTEGER NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS tournaments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      organizer TEXT NOT NULL,
      passcode TEXT NOT NULL
    )
  `).run();
}

export default db;
