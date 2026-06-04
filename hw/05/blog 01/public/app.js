const API = '/api/posts';
const postsList = document.getElementById('posts-list');
const formTitle = document.getElementById('form-title');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const editIdInput = document.getElementById('edit-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

async function loadPosts() {
  const res = await fetch(API);
  const posts = await res.json();
  postsList.innerHTML = posts.map(post => `
    <div class="post-card">
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">${post.created_at}</div>
      <div class="post-content">${escapeHtml(post.content)}</div>
      <div class="post-actions">
        <button onclick="editPost(${post.id})">Edit</button>
        <button class="btn-danger" onclick="deletePost(${post.id})">Delete</button>
      </div>
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

submitBtn.addEventListener('click', submitPost);
cancelBtn.addEventListener('click', resetForm);
loadPosts();
