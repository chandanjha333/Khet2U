const express = require('express');
const cors = require('cors');
const app = express();

// Important: Add CORS before routes
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working' });
});

app.use('/api/auth', require('./routes/auth'));