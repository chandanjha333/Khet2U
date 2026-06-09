const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'homepage.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'products.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'contactus.html'));
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});