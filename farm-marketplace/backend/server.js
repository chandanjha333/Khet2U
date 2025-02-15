import express, { json } from 'express';
import cors from 'cors';
const app = express();

// Important: Add CORS before routes
app.use(cors());
app.use(json());

// Test route
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Backend is working' });
});

app.use('/api/auth', require('./routes/auth'));