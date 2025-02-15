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

async function handleLogin(event, role) {
  event.preventDefault();
  
  const email = document.getElementById(`${role}Email`).value;
  const password = document.getElementById(`${role}Password`).value;

  // Here you would typically make an API call to your backend
  console.log(`Attempting to login as ${role}`);
  console.log('Email:', email);
  console.log('Password:', password);

  // Add your authentication logic here
  // If successful, redirect to appropriate dashboard
  // window.location.href = `${role}-dashboard.html`;

  let userData = {
    email,
    password,
    role
  };

  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);

        window.location.href = 'homepage.html';
    } else {
        alert(data.message);
    }
} catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup');
}
}