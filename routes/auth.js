const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    
    // Create a new user instance
    const newUser = new User({ name, email, password, role, address });
    
    // Save to MongoDB
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;