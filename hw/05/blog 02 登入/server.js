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
  const posts = query('SELECT id, title, content, created_at, updated_at FROM posts ORDER BY created_at DESC');
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  const info = run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
  const post = get('SELECT * FROM posts WHERE id = ?', [info.lastInsertRowid]);
  res.status(201).json(post);
});

app.put('/api/posts/:id', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  const info = run("UPDATE posts SET title = ?, content = ?, updated_at = datetime('now', 'localtime') WHERE id = ?", [title, content, req.params.id]);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  const post = get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
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

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog server running at http://localhost:${PORT}`);
  });
});
