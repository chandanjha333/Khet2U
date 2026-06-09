require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

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
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user by email and role
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
