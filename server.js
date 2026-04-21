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
app.use(cors({
  origin: "*", // Allows any site to access (Standard for public APIs)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"]
}));
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
