const API = '/api/posts';
const postsList = document.getElementById('posts-list');
const postFormContainer = document.getElementById('post-form-container');
const formTitle = document.getElementById('form-title');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const editIdInput = document.getElementById('edit-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

const authSection = document.getElementById('auth-section');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authUsername = document.getElementById('auth-username');
const authPassword = document.getElementById('auth-password');
const authSubmit = document.getElementById('auth-submit');
const authToggle = document.getElementById('auth-toggle');
const authError = document.getElementById('auth-error');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

let isLoginMode = true;
let currentUser = null;

async function loadPosts() {
  const res = await fetch(API);
  const posts = await res.json();
  postsList.innerHTML = posts.map(post => `
    <div class="post-card">
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">${post.created_at}</div>
      <div class="post-content">${escapeHtml(post.content)}</div>
      ${currentUser ? `
      <div class="post-actions">
        <button onclick="editPost(${post.id})">Edit</button>
        <button class="btn-danger" onclick="deletePost(${post.id})">Delete</button>
      </div>` : ''}
    </div>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function submitPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return alert('Title and content are required');

  const id = editIdInput.value;
  const url = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  resetForm();
  loadPosts();
}

function editPost(id) {
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(post => {
      formTitle.textContent = 'Edit Post';
      titleInput.value = post.title;
      contentInput.value = post.content;
      editIdInput.value = post.id;
      submitBtn.textContent = 'Update';
      cancelBtn.style.display = 'inline-block';
    });
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadPosts();
}

function resetForm() {
  formTitle.textContent = 'New Post';
  titleInput.value = '';
  contentInput.value = '';
  editIdInput.value = '';
  submitBtn.textContent = 'Publish';
  cancelBtn.style.display = 'none';
}

// Auth functions
async function checkAuth() {
  const res = await fetch('/api/me');
  if (!res.ok) return setUser(null);
  const user = await res.json();
  setUser(user);
}

function setUser(user) {
  currentUser = user;
  if (user) {
    authForm.style.display = 'none';
    userInfo.style.display = 'flex';
    userName.textContent = user.username;
    postFormContainer.style.display = 'block';
  } else {
    authForm.style.display = 'block';
    userInfo.style.display = 'none';
    postFormContainer.style.display = 'none';
  }
  loadPosts();
}

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

async function handleLogout() {
  await fetch('/api/logout', { method: 'POST' });
  setUser(null);
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  authTitle.textContent = isLoginMode ? 'Login' : 'Register';
  authSubmit.textContent = isLoginMode ? 'Login' : 'Register';
  authToggle.textContent = isLoginMode ? 'Switch to Register' : 'Switch to Login';
  authError.textContent = '';
}

submitBtn.addEventListener('click', submitPost);
cancelBtn.addEventListener('click', resetForm);
authSubmit.addEventListener('click', handleAuth);
authToggle.addEventListener('click', toggleAuthMode);
logoutBtn.addEventListener('click', handleLogout);

checkAuth();
