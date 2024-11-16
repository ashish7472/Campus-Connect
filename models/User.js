// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rollnumber: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    interests: { type: [String], required: true }
});

module.exports = mongoose.model('User', UserSchema);
