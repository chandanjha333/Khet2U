// const express = require('express');
// const cors = require('cors');
// const app = express();

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






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI ='mongodb://localhost:27017/farmMarket';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
