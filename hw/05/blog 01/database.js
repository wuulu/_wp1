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
      created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `);

  const count = db.exec('SELECT COUNT(*) AS cnt FROM posts');
  if (!count[0] || count[0].values[0][0] === 0) {
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
  db.run(sql, params);
  saveDb();
  return { changes: db.getRowsModified(), lastInsertRowid: db.exec("SELECT last_insert_rowid() AS id")[0].values[0][0] };
}

function get(sql, params = []) {
  const rows = query(sql, params);
  return rows[0] || null;
}

module.exports = { initDb, query, run, get };
