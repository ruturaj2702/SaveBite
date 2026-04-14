import React, { useState } from "react"; // Fixes 'useState' is not defined
import axios from "axios"; // Fixes 'axios' is not defined
import { toast } from "react-toastify";

const DonorForm = ({ onRefresh }) => {
  // Fixes 'onRefresh' is not defined

  // Hooks MUST be inside this function
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryTime: "",
    foodType: "Veg",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending to Backend:", formData);

    // Default expiry: 4 hours from now if empty
    const finalExpiry =
      formData.expiryTime ||
      new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();

    const dataToSend = {
      ...formData,
      expiryTime: finalExpiry,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/food/add", dataToSend, {
        headers: { "x-auth-token": token }
      })
      .then((res) => {
        // Replace alert("Food Added") with this:
        toast.success("🚀 Food listed! NGOs have been notified.");
        // Clear your form here if you want
      })
      .catch((err) => {
        toast.error("❌ Oops! Something went wrong.");
      });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        List Excess Food
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          type="text"
          placeholder="Food Name"
          onChange={(e) =>
            setFormData({ ...formData, foodName: e.target.value })
          }
          required
        />
        <input
          className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          type="text"
          placeholder="Quantity (e.g. 20 plates)"
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          required
        />
        <input
          className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          type="datetime-local"
          onChange={(e) =>
            setFormData({ ...formData, expiryTime: e.target.value })
          }
        />
        <select
          className="p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          onChange={(e) =>
            setFormData({ ...formData, foodType: e.target.value })
          }
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2 text-left">
            Food Condition
          </label>
          {/* Change your select to look exactly like this */}
          <select
            className="w-full p-3 border rounded-xl"
            required
            defaultValue="Fresh" // Forces a default value
            onChange={(e) =>
              setFormData({ ...formData, condition: e.target.value })
            }
          >
            <option value="Fresh">🥗 Fresh (Donation)</option>
            <option value="Damaged">🍂 Damaged (Green Waste)</option>
          </select>
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          🚀 Publish Donation
        </button>
      </form>
    </div>
  );
};
export default DonorForm;
