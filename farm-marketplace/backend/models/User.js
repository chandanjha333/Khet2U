const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['farmer', 'consumer'] },
    location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
