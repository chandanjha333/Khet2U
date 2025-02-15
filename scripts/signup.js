const API_URL = 'http://localhost:5000/api';

function switchTab(role) {
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

async function handleSignup(event, role) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById(`${role}Name`).value;
  const email = document.getElementById(`${role}Email`).value;
  const phone = document.getElementById(`${role}Phone`).value;
  const password = document.getElementById(`${role}Password`).value;
  const confirmPassword = document.getElementById(`${role}ConfirmPassword`).value;

  // Password validation
  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  // Additional farmer-specific data
  let userData = {
    name,
    email,
    phone,
    password,
    role,
  };

  if (role === 'farmer') {
    userData.location = document.getElementById('farmerLocation').value;
  }

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      // Store token and redirect to login page
      localStorage.setItem('token', data.token);
      window.location.href = 'login-page.html';
    } else {
      const errorText = await response.text();
      alert(`Error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup');
  }
}

