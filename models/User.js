const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // In a real app, we'd hash this!
  role: { 
    type: String, 
    enum: ['donor', 'ngo', 'volunteer'], 
    required: true 
  },
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);