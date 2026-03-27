import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./components/FoodCard";

const VolunteerPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const fetchVolunteerTasks = async () => {
    try {
      // CHANGE THIS URL to match your backend route #4
      const res = await axios.get('http://localhost:5000/api/food/to-transport');
      
      console.log("Volunteer Tasks Received:", res.data);
      // No need to filter here because the Backend already did it!
      setTasks(res.data); 
    } catch (err) {
      console.error("Volunteer fetch failed:", err);
    }
  };

  fetchVolunteerTasks();
}, []);

  const handleDelivery = (id) => {
    axios
      .put(`http://localhost:5000/api/food/deliver/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Delivery update failed", err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-600 p-3 rounded-2xl text-white text-2xl">
          🚚
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Volunteer Portal
          </h1>
          <p className="text-gray-500">
            Active pickups required for community support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div key={item._id} className="relative">
              {/* Badge to show if it's Fresh or Green Waste */}
              <span
                className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white z-10 shadow-sm ${item.condition === "Damaged" ? "bg-amber-600" : "bg-emerald-600"}`}
              >
                {item.condition === "Damaged" ? "🍂 ECO" : "🥗 FOOD"}
              </span>

              <FoodCard
                item={item}
                buttonText="Mark as Delivered"
                buttonColor="#2563eb" // Blue for logistics
                onButtonClick={() => handleDelivery(item._id)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-100 rounded-[2rem] border-2 border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">
              No pending deliveries. You're all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerPage;
