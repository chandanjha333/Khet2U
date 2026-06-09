fetch('/api/me', { credentials: 'include' })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Not logged in');
  })
  .then(user => {
    // show profile icon, hide login/signup
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('signup-button').style.display = 'none';
    document.getElementById('profile-menu').classList.remove('hidden');
    document.getElementById('username').innerText = user.name;
  })
  .catch(() => {
    // show login/signup buttons
    document.getElementById('login-button').style.display = 'inline-block';
    document.getElementById('signup-button').style.display = 'inline-block';
    document.getElementById('profile-menu').style.display = 'none';
    document.getElementById('profile-icon').style.display = 'none';
  });

function logout() {
  fetch('/api/logout', { method: 'POST', credentials: 'include' })
    .then(() => window.location.href = '/')
    .catch(err => console.log(err));
}

function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('hidden');
}

document.getElementById('profile-icon').onclick = toggleDropdown;

document.getElementById('logout-btn').onclick = logout;