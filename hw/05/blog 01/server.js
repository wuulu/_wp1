const express = require('express');
const { initDb, query, get, run } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/posts', (req, res) => {
  const posts = query('SELECT id, title, content, created_at, updated_at FROM posts ORDER BY created_at DESC');
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  const info = run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
  const post = get('SELECT * FROM posts WHERE id = ?', [info.lastInsertRowid]);
  res.status(201).json(post);
});

app.put('/api/posts/:id', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  const info = run("UPDATE posts SET title = ?, content = ?, updated_at = datetime('now', 'localtime') WHERE id = ?", [title, content, req.params.id]);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  const post = get('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  const info = run('DELETE FROM posts WHERE id = ?', [req.params.id]);
  if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
  res.json({ message: 'Post deleted' });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog server running at http://localhost:${PORT}`);
  });
});
