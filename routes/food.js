const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const auth = require('../middleware/auth');

// 1. POST: Create a food listing
router.post('/add', auth, async (req, res) => {
  try {
    // Prevent dummy ID from frontend, strictly map out identity from authenticated user token
    const foodData = { ...req.body, donorId: req.user.id };
    const newFood = new Food(foodData);
    await newFood.save();
    res.status(201).json({ message: "Food listed successfully!", food: newFood });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. GET: View all available food (For NGOs)
router.get('/available', auth, async (req, res) => {
  try {
    const listings = await Food.find({ status: 'available' }).populate('donorId', 'name address');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT: NGO claims the food
router.put('/claim/:id', auth, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id, 
      { status: 'claimed', ngoId: req.user.id }, 
      { new: true }
    );
    res.json({ message: "Food claimed successfully!", food: updatedFood });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. GET: Volunteers see food that is 'claimed'
router.get('/to-transport', auth, async (req, res) => {
  try {
    const tasks = await Food.find({ status: 'claimed' })
      .populate('donorId', 'name address')
      .populate('ngoId', 'name address');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. PUT: Volunteer marks food as 'delivered'
router.put('/deliver/:id', auth, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id, 
      { status: 'delivered' }, 
      { new: true }
    );
    res.json({ message: "Task completed! Food delivered.", food: updatedFood });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;