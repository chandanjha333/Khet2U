const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = '01abf825a1ebef8f06cc7a4c3326ebd353c1e19b971bc05f03fdf8013ab057d33438efe81c329f857e63df5d6eff58c8b1e849d643827633c1fbbd71c291abaf';

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password, role, location } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            location
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Login Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up first.' });
        }

        // Validate role
        if (user.role !== role) {
            return res.status(400).json({ message: 'Incorrect role selected.' });
        }

        // Compare hashed passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET, // Ensure this is set in your environment variables
            { expiresIn: '1h' }
        );

        // Send response with token & user data
        res.json({ 
            message: 'Sign-in successful!', 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
