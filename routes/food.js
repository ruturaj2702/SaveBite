const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const User = require('../models/user');
const auth = require('../middleware/auth');
const sendEmail = require('../mail');
const {
  newFoodEmail,
  foodClaimedByNgoEmail,
  pickupReadyEmail,
  foodDeliveredEmail,
} = require('../utils/emailTemplates');

// 1. POST: Create a food listing
router.post('/add', auth, async (req, res) => {
  try {
    // Prevent dummy ID from frontend, strictly map out identity from authenticated user token
    const foodData = { ...req.body, donorId: req.user.id };
    const newFood = new Food(foodData);
    await newFood.save();

    res.status(201).json({ message: "Food listed successfully!", food: newFood });

    // 🔔 EMAIL: Notify all NGOs — fire-and-forget (after response sent)
    (async () => {
      try {
        const donor = await User.findById(req.user.id).select('name address');
        const ngos = await User.find({ role: 'ngo' }).select('email name');

        if (ngos.length > 0) {
          const { subject, html } = newFoodEmail(newFood, donor);
          const emailPromises = ngos.map(ngo =>
            sendEmail(ngo.email, subject, '', html).catch(err =>
              console.error(`❌ Failed to email NGO ${ngo.email}:`, err.message)
            )
          );
          await Promise.all(emailPromises);
          console.log(`📩 Notified ${ngos.length} NGO(s) about new food listing.`);
        }
      } catch (err) {
        console.error('❌ Email notification error (food listed):', err.message);
      }
    })();

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

    // 🔔 EMAIL: Notify donor + all volunteers — fire-and-forget
    (async () => {
      try {
        const [donor, ngo, volunteers] = await Promise.all([
          User.findById(updatedFood.donorId).select('email name address'),
          User.findById(req.user.id).select('name address'),
          User.find({ role: 'volunteer' }).select('email name'),
        ]);

        const emailTasks = [];

        // Notify donor
        if (donor?.email) {
          const { subject, html } = foodClaimedByNgoEmail(updatedFood, ngo);
          emailTasks.push(
            sendEmail(donor.email, subject, '', html).catch(err =>
              console.error(`❌ Failed to email donor ${donor.email}:`, err.message)
            )
          );
        }

        // Notify all volunteers
        if (volunteers.length > 0) {
          const { subject, html } = pickupReadyEmail(updatedFood, donor, ngo);
          volunteers.forEach(vol => {
            emailTasks.push(
              sendEmail(vol.email, subject, '', html).catch(err =>
                console.error(`❌ Failed to email volunteer ${vol.email}:`, err.message)
              )
            );
          });
        }

        await Promise.all(emailTasks);
        console.log(`📩 Notified donor + ${volunteers.length} volunteer(s) about food claim.`);
      } catch (err) {
        console.error('❌ Email notification error (food claimed):', err.message);
      }
    })();

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
      { status: 'delivered', volunteerId: req.user.id },
      { new: true }
    );
    res.json({ message: "Task completed! Food delivered.", food: updatedFood });

    // 🔔 EMAIL: Notify the NGO that claimed the food — fire-and-forget
    (async () => {
      try {
        if (!updatedFood.ngoId) return;
        const ngo = await User.findById(updatedFood.ngoId).select('email name');
        if (ngo?.email) {
          const { subject, html } = foodDeliveredEmail(updatedFood);
          await sendEmail(ngo.email, subject, '', html);
          console.log(`📩 Notified NGO ${ngo.email} about delivery completion.`);
        }
      } catch (err) {
        console.error('❌ Email notification error (food delivered):', err.message);
      }
    })();

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;