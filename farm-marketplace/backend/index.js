require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');
const User = require('./models/User');
const { rateLimiter } = require('./middleware/ratelimiter');

const app = express();
const PORT = process.env.PORT || 5500;

connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET).user;
    console.log(req.user);
    next();
  } catch(err) {
    console.log('err:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(rateLimiter(100, 60));

app.get('/', rateLimiter(30, 60), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'homepage.html'));
});

app.get('/login', rateLimiter(30, 60), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/signup', rateLimiter(30, 60), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

app.get('/products', rateLimiter(30, 60), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'products.html'));
});

app.get('/contacts', rateLimiter(30, 60), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'contactus.html'));
});

app.get('/api/me', rateLimiter(5, 60), verifyToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ name: user.name, email: user.email });
});

app.post('/api/logout', rateLimiter(5, 60), (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});