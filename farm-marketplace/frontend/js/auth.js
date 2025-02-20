const API_URL = 'http://localhost:5500/api';

function switchTab(role, event) {
    if (!event) return;
    
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.classList.remove('active'));
    document.getElementById(`${role}Form`).classList.add('active');
}

async function handleSignup(event, role) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById(`${role}Name`).value;
    const email = document.getElementById(`${role}Email`).value;
    const phone = document.getElementById(`${role}Phone`).value;
    const password = document.getElementById(`${role}Password`).value;
    const confirmPassword = document.getElementById(`${role}ConfirmPassword`).value;
    
    // Validation logic
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Create user data
    let userData = {
        name,
        email,
        phone,
        password,
        role
    };

    if (role === 'farmer') {
        const location = document.getElementById('farmerLocation').value;
        if (!location) {
            alert('Please enter your location');
            return;
        }
        userData.location = location;
    }

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup');
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
        alert('An error occurred during login');
    }
}