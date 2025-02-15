import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth'
const app = express();

// // Important: Add CORS before routes
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'Backend is working' });
// });

// app.use('/api/auth', require('./routes/auth'));

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

app.use(cors());
app.use(json());

// Test route
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Backend is working' });
});

const PORT = 5500;
const MONGO_URI ='mongodb://localhost:27017/Farm-marketplace';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));