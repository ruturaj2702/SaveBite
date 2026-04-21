const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/food_management')
  .then(async () => {
    console.log("Connected to MongoDB");
    const User = require('./models/User');
    
    // Find latest users
    const users = await User.find({}).sort({createdAt: -1}).limit(10);
    console.log("Latest Users Full Payload:");
    users.forEach(u => {
      console.log(u.toObject());
    });
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Connection error:", err);
  });
