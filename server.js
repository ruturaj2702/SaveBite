const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Move this up here
const authRoutes = require("./routes/auth");
const foodRoutes = require("./routes/food");
const Food = require("./models/Food"); 

// 1. Load configuration
dotenv.config();
const app = express();

// 2. Middleware (MUST BE BEFORE ROUTES)
app.use(cors());
app.use(express.json());

// 3. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
  res.send("Excess Food Management API is Running!");
});

app.put("/api/food/claim/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { status: "claimed" }, 
      { new: true } // This "new: true" is what sends the updated status back to React!
    );
    
    if (!food) {
      console.log("❌ Food ID not found in DB");
      return res.status(404).send("Food not found");
    }

    console.log("✅ Database Updated:", food.foodName, "is now", food.status);
    res.json(food); 
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(400).send("Invalid ID format or Server Error");
  }
});




// 5. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
