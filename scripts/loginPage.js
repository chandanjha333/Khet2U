const API_URL = 'http://localhost:5500/api';

function switchTab(role, event) {
  // Update tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');

  // Update forms
  const forms = document.querySelectorAll('.form-container');
  forms.forEach(form => form.classList.remove('active'));
  
  if (role === 'consumer') {
      document.getElementById('consumerForm').classList.add('active');
  } else {
      document.getElementById('farmerForm').classList.add('active');
  }
}

async function handleLogin(event, role) {
  event.preventDefault();
  
  const email = document.getElementById(`${role}Email`).value;
  const password = document.getElementById(`${role}Password`).value;

  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  let userData = {
    email,
    password,
    role
  };

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', role);
        window.location.href = 'homepage.html';
    } else {
        alert(data.message || 'Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login. Please try again.');
  }
}