const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'blog.db');

let db;

async function initDb() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      content     TEXT    NOT NULL,
      user_id     INTEGER REFERENCES users(id),
      created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT    NOT NULL UNIQUE,
      password_hash TEXT    NOT NULL,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Migrate: add user_id column if missing in existing db
  try {
    db.run("ALTER TABLE posts ADD COLUMN user_id INTEGER REFERENCES users(id)");
  } catch (e) {
    // Column already exists, ignore
  }

  const postCount = db.exec('SELECT COUNT(*) AS cnt FROM posts');
  if (!postCount[0] || postCount[0].values[0][0] === 0) {
    db.run("INSERT INTO posts (title, content) VALUES ('Hello World', 'This is my first blog post!')");
    db.run("INSERT INTO posts (title, content) VALUES ('第二篇文章', '這裡是中文內容。')");
    db.run("INSERT INTO posts (title, content) VALUES ('Getting Started with Node.js', 'Node.js is a JavaScript runtime built on Chrome''s V8 engine.')");
  }

  saveDb();
}

function saveDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function query(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function run(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  stmt.step();
  stmt.free();
  const changes = db.getRowsModified();
  const tableMatch = sql.match(/INSERT\s+INTO\s+(\w+)/i);
  let id = 0;
  if (tableMatch) {
    const seq = db.exec("SELECT seq FROM sqlite_sequence WHERE name = '" + tableMatch[1] + "'");
    if (seq[0] && seq[0].values[0]) id = seq[0].values[0][0];
  }
  saveDb();
  return { changes, lastInsertRowid: id };
}

function get(sql, params = []) {
  const rows = query(sql, params);
  return rows[0] || null;
}

module.exports = { initDb, query, run, get };
