const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const { initDb, query, get, run } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'blog-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/posts', (req, res) => {
  const { user_id } = req.query;
  let sql, params;
  if (user_id) {
    sql = `SELECT p.id, p.title, p.content, p.created_at, p.updated_at, p.user_id, u.username
           FROM posts p LEFT JOIN users u ON p.user_id = u.id
           WHERE p.user_id = ? ORDER BY p.created_at DESC`;
    params = [user_id];
  } else {
    sql = `SELECT p.id, p.title, p.content, p.created_at, p.updated_at, p.user_id, u.username
           FROM posts p LEFT JOIN users u ON p.user_id = u.id
           ORDER BY p.created_at DESC`;
    params = [];
  }
  const posts = query(sql, params);
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = get(`SELECT p.*, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [req.params.id]);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, req.session.userId]);
  const posts = query(`SELECT p.*, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.user_id = ? ORDER BY p.id DESC LIMIT 1`, [req.session.userId]);
  res.status(201).json(posts[0]);
});

app.put('/api/posts/:id', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  const info = run("UPDATE posts SET title = ?, content = ?, updated_at = datetime('now', 'localtime') WHERE id = ?", [title, content, req.params.id]);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  const post = get(`SELECT p.*, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [req.params.id]);
  res.json(post);
});

app.delete('/api/posts/:id', requireAuth, (req, res) => {
  const info = run('DELETE FROM posts WHERE id = ?', [req.params.id]);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  res.json({ message: 'Post deleted' });
});

// Auth routes
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });
  if (password.length < 4) return res.status(400).json({ error: 'Password must be at least 4 characters' });

  const existing = get('SELECT id FROM users WHERE username = ?', [username]);
  if (existing) return res.status(409).json({ error: 'Username already exists' });

  const password_hash = await bcrypt.hash(password, 10);
  run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, password_hash]);
  const user = get('SELECT id, username, created_at FROM users WHERE username = ?', [username]);
  req.session.userId = user.id;
  req.session.username = user.username;
  res.status(201).json({ id: user.id, username: user.username });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

  const user = get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) return res.status(401).json({ error: 'Invalid username or password' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid username or password' });

  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ id: user.id, username: user.username });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

app.get('/api/me', (req, res) => {
  if (!req.session.userId) return res.json(null);
  res.json({ id: req.session.userId, username: req.session.username });
});

app.get('/api/users/:id', (req, res) => {
  const user = get('SELECT id, username, created_at FROM users WHERE id = ?', [req.params.id]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const postCount = query('SELECT COUNT(*) AS count FROM posts WHERE user_id = ?', [req.params.id])[0].count;
  res.json({ ...user, post_count: postCount });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog server running at http://localhost:${PORT}`);
  });
});
