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

function handleSignup(event, role) {
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

  // Additional farmer-specific data
  let userData = {
    name,
    email,
    phone,
    password,
    role
  };

  if (role === 'farmer') {
    userData.location = document.getElementById('farmerLocation').value;
  }

  // Here you would typically make an API call to your backend
  console.log('Signing up user:', userData);

  // Add your registration logic here
  // If successful, redirect to login page
  // window.location.href = 'login.html';
}