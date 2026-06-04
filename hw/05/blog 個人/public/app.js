const API = '/api/posts';
const postsList = document.getElementById('posts-list');
const composer = document.getElementById('composer');
const contentInput = document.getElementById('post-content');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const charCount = document.getElementById('char-count');

const authSection = document.getElementById('auth-section');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authUsername = document.getElementById('auth-username');
const authPassword = document.getElementById('auth-password');
const authSubmit = document.getElementById('auth-submit');
const authToggle = document.getElementById('auth-toggle');
const authError = document.getElementById('auth-error');

const mainContent = document.getElementById('main-content');
const navUser = document.getElementById('nav-user');
const tabs = document.querySelectorAll('.tab');

let isLoginMode = true;
let currentUser = null;
let activeTab = 'for-you';

// Auth state
async function checkAuth() {
  const res = await fetch('/api/me');
  if (!res.ok) return setUser(null);
  const user = await res.json();
  setUser(user);
}

function setUser(user) {
  currentUser = user;
  if (user) {
    authSection.style.display = 'none';
    mainContent.style.display = 'block';
    navUser.innerHTML = `
      <span>${escapeHtml(user.username)}</span>
      <button onclick="logout()">Log out</button>
    `;
    switchTab(activeTab);
  } else {
    authSection.style.display = 'flex';
    mainContent.style.display = 'none';
    navUser.innerHTML = '';
  }
}

// Tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

function switchTab(tab) {
  activeTab = tab;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  if (tab === 'my-posts' && currentUser) {
    composer.style.display = 'block';
    loadMyPosts();
  } else {
    composer.style.display = currentUser ? 'block' : 'none';
    loadAllPosts();
  }
}

// Load posts
async function loadAllPosts() {
  const res = await fetch(API);
  const posts = await res.json();
  renderPosts(posts);
}

async function loadMyPosts() {
  const res = await fetch(`${API}?user_id=${currentUser.id}`);
  const posts = await res.json();
  renderPosts(posts);
}

function renderPosts(posts) {
  postsList.innerHTML = posts.map(post => `
    <div class="post-card">
      <div class="post-header">
        <div class="avatar">${getInitial(post.username || 'A')}</div>
        <div>
          <div class="post-username">${escapeHtml(post.username || 'anonymous')}</div>
          <div class="post-meta">${timeAgo(post.created_at)}</div>
        </div>
      </div>
      <div class="post-content">${escapeHtml(post.content)}</div>
      ${currentUser && post.user_id === currentUser.id ? `
      <div class="post-actions">
        <button class="btn-ghost-sm" onclick="editPost(${post.id})">Edit</button>
        <button class="btn-danger-sm" onclick="deletePost(${post.id})">Delete</button>
      </div>` : ''}
    </div>
  `).join('');
}

function getInitial(username) {
  return username.charAt(0).toUpperCase();
}

function timeAgo(dateStr) {
  const date = new Date(dateStr.replace(' ', 'T') + (dateStr.includes('Z') ? '' : 'Z'));
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h';
  return Math.floor(diff / 86400) + 'd';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Post CRUD
contentInput.addEventListener('input', () => {
  charCount.textContent = contentInput.value.length;
  contentInput.style.height = 'auto';
  contentInput.style.height = Math.min(contentInput.scrollHeight, 200) + 'px';
});

async function submitPost() {
  const content = contentInput.value.trim();
  if (!content) return;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: content.substring(0, 80), content })
  });

  contentInput.value = '';
  charCount.textContent = '0';
  contentInput.style.height = 'auto';
  switchTab(activeTab);
}

async function editPost(id) {
  const res = await fetch(`${API}/${id}`);
  const post = await res.json();
  contentInput.value = post.content;
  charCount.textContent = post.content.length;
  contentInput.style.height = 'auto';
  contentInput.style.height = Math.min(contentInput.scrollHeight, 200) + 'px';
  contentInput.focus();

  submitBtn.textContent = 'Update';
  cancelBtn.style.display = 'inline-block';
  submitBtn._editId = id;
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  switchTab(activeTab);
}

submitBtn.addEventListener('click', async () => {
  const content = contentInput.value.trim();
  if (!content) return;

  const id = submitBtn._editId;
  if (id) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: content.substring(0, 80), content })
    });
    delete submitBtn._editId;
    submitBtn.textContent = 'Post';
    cancelBtn.style.display = 'none';
  } else {
    await submitPost();
  }

  contentInput.value = '';
  charCount.textContent = '0';
  contentInput.style.height = 'auto';
  switchTab(activeTab);
});

cancelBtn.addEventListener('click', () => {
  contentInput.value = '';
  charCount.textContent = '0';
  contentInput.style.height = 'auto';
  submitBtn.textContent = 'Post';
  cancelBtn.style.display = 'none';
  delete submitBtn._editId;
});

// Auth handlers
async function handleAuth() {
  const username = authUsername.value.trim();
  const password = authPassword.value.trim();
  if (!username || !password) {
    authError.textContent = 'Username and password are required';
    return;
  }
  authError.textContent = '';
  const endpoint = isLoginMode ? '/api/login' : '/api/register';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const err = await res.json();
    authError.textContent = err.error;
    return;
  }
  const user = await res.json();
  authUsername.value = '';
  authPassword.value = '';
  setUser(user);
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  setUser(null);
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  authTitle.textContent = isLoginMode ? 'Log in' : 'Create account';
  authSubmit.textContent = isLoginMode ? 'Log in' : 'Sign up';
  authToggle.textContent = isLoginMode ? 'Create account' : 'Log in';
  authError.textContent = '';
}

authSubmit.addEventListener('click', handleAuth);
authToggle.addEventListener('click', toggleAuthMode);

checkAuth();
