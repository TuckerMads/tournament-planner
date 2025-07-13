import Database from 'better-sqlite3';

const db = new Database('testdb.db');


/*
* Run DB migrations if the table is not here already for testing.
*/
export function initializeDatabase() {
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
