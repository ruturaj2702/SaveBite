import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DonorForm = ({ onRefresh }) => {
  const [formData, setFormData] = useState({
    foodName: "", quantity: "", expiryTime: "", foodType: "Veg", condition: "Fresh",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalExpiry = formData.expiryTime || new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/food/add", { ...formData, expiryTime: finalExpiry }, {
        headers: { "x-auth-token": token },
      });
      toast.success("🚀 Food listed! NGOs have been notified via email.");
      setFormData({ foodName: "", quantity: "", expiryTime: "", foodType: "Veg", condition: "Fresh" });
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sb-donor-form">
      <div className="sb-page-header" style={{ marginBottom: '28px' }}>
        <div className="sb-page-icon">🍱</div>
        <div>
          <div className="sb-page-title" style={{ fontSize: '20px' }}>List Excess Food</div>
          <div className="sb-page-subtitle">Fill in the details and NGOs will be notified instantly</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="sb-form-grid-2">
          <div className="sb-form-group">
            <label className="sb-label">Food Name</label>
            <input
              className="sb-input"
              name="foodName"
              type="text"
              placeholder="e.g. Biryani, Pasta, Curry"
              value={formData.foodName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sb-form-group">
            <label className="sb-label">Quantity</label>
            <input
              className="sb-input"
              name="quantity"
              type="text"
              placeholder="e.g. 20 plates, 5 kg"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sb-form-grid-2">
          <div className="sb-form-group">
            <label className="sb-label">Food Type</label>
            <select className="sb-select" name="foodType" value={formData.foodType} onChange={handleChange}>
              <option value="Veg">🥦 Vegetarian</option>
              <option value="Non-Veg">🍗 Non-Vegetarian</option>
              <option value="Other">🥗 Other</option>
            </select>
          </div>
          <div className="sb-form-group">
            <label className="sb-label">Condition</label>
            <select className="sb-select" name="condition" value={formData.condition} onChange={handleChange} required>
              <option value="Fresh">🥗 Fresh (For Donation)</option>
              <option value="Damaged">🍂 Damaged (Green Waste)</option>
            </select>
          </div>
        </div>

        <div className="sb-form-group">
          <label className="sb-label">Expiry Time (optional — defaults to 4 hrs from now)</label>
          <input
            className="sb-input"
            name="expiryTime"
            type="datetime-local"
            value={formData.expiryTime}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="sb-btn sb-btn-primary"
          disabled={loading}
          style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '4px' }}
        >
          {loading ? 'Publishing…' : '🚀 Publish Donation'}
        </button>
      </form>
    </div>
  );
};

export default DonorForm;
