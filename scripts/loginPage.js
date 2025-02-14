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

function handleLogin(event, role) {
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
}