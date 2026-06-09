const token = localStorage.getItem('token');

if (token) {
  document.getElementById('login-button').style.display = 'none';
  document.getElementById('signup-button').style.display = 'none';
  document.getElementById('profile-menu').style.display = 'block';

  // Fetch user details
  fetch('/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById('username').innerText = data.name;
    });
}

function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('hidden');
}

document.getElementById('profile-icon').onclick = toggleDropdown;

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}