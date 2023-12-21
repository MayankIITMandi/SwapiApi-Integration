// src/db/databaseInitializer.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/database.db');

// Create tables if not exists
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
});

db.close();
