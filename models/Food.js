const mongoose = require("mongoose");

// Inside models/Food.js
const foodSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foodName: { type: String, required: true },
  quantity: { type: String, required: true }, // e.g., "10kg" or "50 servings"
  expiryTime: { type: Date, required: true },
  foodType: { type: String, enum: ["Veg", "Non-Veg", "Other"], required: true },
  status: {
    type: String,
    enum: ["available", "claimed", "picked_up", "delivered"],
    default: "available",
  },
  condition: {
    type: String,
    enum: ["Fresh", "Damaged"],
    default: "Fresh",
  },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", foodSchema);
