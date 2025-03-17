import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Initialize SQLite database
const sqlite = new Database('schoolsoft.db');
export const db = drizzle(sqlite, { schema });

// Helper function to initialize the database
export async function initDatabase() {
  // Create tables
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL,
      phone TEXT NOT NULL,
      avatar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      class_id TEXT NOT NULL,
      parent_id TEXT NOT NULL,
      qr_code TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES users(id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      grade TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS scan_logs (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      scanned_by TEXT NOT NULL,
      type TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (scanned_by) REFERENCES users(id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      date TIMESTAMP NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id)
    )`
  ];

  // Execute each query
  for (const query of queries) {
    sqlite.exec(query);
  }
}

// Initialize database on import
initDatabase().catch(console.error);