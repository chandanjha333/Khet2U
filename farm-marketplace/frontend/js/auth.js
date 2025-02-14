const API_URL = 'http://localhost:5500/api';

// For signup.html
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

    // Create user data object
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

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
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
            // Redirect to appropriate dashboard
            window.location.href = `${role}-dashboard.html`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup');
    }
}

// For login.html
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