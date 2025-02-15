async function handleLogin(event, role) {
  event.preventDefault();
  
  const email = document.getElementById(`${role}Email`).value;
  const password = document.getElementById(`${role}Password`).value;

  console.log('Attempting login with:', { email, password, role });

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = `${role}-dashboard.html`;
    } else {
      alert(data.message);
    }
  } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
  }
}