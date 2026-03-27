const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// 1. POST: Create a food listing
router.post('/add', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json({ message: "Food listed successfully!", food: newFood });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. GET: View all available food (For NGOs)
router.get('/available', async (req, res) => {
  try {
    const listings = await Food.find({ status: 'available' }).populate('donorId', 'name address');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT: NGO claims the food
router.put('/claim/:id', async (req, res) => {
  try {
    const { ngoId } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id, 
      { status: 'claimed', ngoId: ngoId }, 
      { new: true }
    );
    res.json({ message: "Food claimed successfully!", food: updatedFood });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}); // <--- THIS WAS THE MISSING BRACKET THAT CAUSED THE 404!

// 4. GET: Volunteers see food that is 'claimed'
router.get('/to-transport', async (req, res) => {
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
router.put('/deliver/:id', async (req, res) => {
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