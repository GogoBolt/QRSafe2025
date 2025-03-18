import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

// Définir un chemin sûr pour la base de données
const DB_PATH = path.resolve(process.cwd(), "data", "schoolsoft.db");

// Vérifier si le dossier data existe, sinon le créer
const DB_DIR = path.dirname(DB_PATH);
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialiser la base de données SQLite
const sqlite = new Database(DB_PATH, { fileMustExist: false });
export const db = drizzle(sqlite, { schema });

// Fonction pour initialiser les tables si elles n'existent pas
export async function initDatabase() {
  try {
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

    for (const query of queries) {
      sqlite.exec(query);
    }

    console.log("✅ Base de données initialisée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de la base de données :", error);
  }
}

// Initialiser la base de données à l'importation
initDatabase();
