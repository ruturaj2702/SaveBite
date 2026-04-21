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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
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
  res.send("SaveBite API is Running!");
});

// 5. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on Port ${PORT}`);
});
