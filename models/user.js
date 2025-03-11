const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  role: { type: String, enum: ['user', 'admin'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
