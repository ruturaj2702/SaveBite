import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./components/FoodCard"; // Make sure this path is correct!

const NgoPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthorized = user?.role === 'ngo';
  const [availableFood, setAvailableFood] = useState([]);
  const [activeTab, setActiveTab] = useState("human");

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/food/available", {
        headers: { "x-auth-token": token }
      })
      .then((res) => setAvailableFood(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 2. THE CLAIM FUNCTION
  const handleClaim = (id) => {
  const token = localStorage.getItem("token");

  axios.put(`http://localhost:5000/api/food/claim/${id}`, {}, {
    headers: { "x-auth-token": token }
  })
    .then(res => {
      // Access the status inside the 'food' object from your route
      if (res.data.food && res.data.food.status === 'claimed') {
        console.log("✅ Success! Item is now claimed.");
        setAvailableFood(prev => prev.filter(item => item._id !== id));
      }
    })
    .catch(err => console.error("Claim Error:", err));
};

  // Separate the logic strictly
  // Filter for Fresh: Only shows if condition is 'Fresh' OR if condition doesn't exist at all
  const freshFood = availableFood.filter((item) => {
    const status = String(item.condition || "Fresh")
      .trim()
      .toLowerCase();
    return status === "fresh";
  });

  const damagedFood = availableFood.filter((item) => {
    const status = String(item.condition || "")
      .trim()
      .toLowerCase();
    return status === "damaged";
  });

  // DEBUG: This will tell us exactly what the React state sees
  console.log(
    "Current Items in State:",
    availableFood.map((f) => ({ name: f.foodName, cond: f.condition })),
  );

  // 4. YOUR RETURN BLOCK
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">NGO Dashboard</h1>

        {/* TAB SWITCHER */}
        <div className="flex bg-gray-200 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("human")}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === "human" ? "bg-white text-emerald-600 shadow-md" : "text-gray-500"}`}
          >
            🥗 Human Food
          </button>
          <button
            onClick={() => setActiveTab("eco")}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === "eco" ? "bg-white text-amber-700 shadow-md" : "text-gray-500"}`}
          >
            🍂 Green Waste
          </button>
        </div>
      </div>

      {activeTab === "human" ? (
        <section className="animate-fadeIn">
          <h2 className="text-xl font-bold text-emerald-800 mb-6 uppercase tracking-wider">
            Available Meals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freshFood.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                buttonColor="#10b981"
                buttonText="Claim Meal"
                onButtonClick={() => handleClaim(item._id)} // <--- CONNECTED HERE
                isActionAllowed={isAuthorized}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="animate-fadeIn">
          <div className="bg-amber-50 p-8 rounded-3xl border-2 border-amber-100">
            <h2 className="text-xl font-bold text-amber-900 mb-4 uppercase tracking-wider">
              Compost & Manure Redirect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {damagedFood.map((item) => (
                <FoodCard
                  key={item._id}
                  item={item}
                  buttonText="Claim for Manure"
                  buttonColor="#92400e"
                  isEco={true} 
                  onButtonClick={() => handleClaim(item._id)}
                  isActionAllowed={isAuthorized}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NgoPage;
