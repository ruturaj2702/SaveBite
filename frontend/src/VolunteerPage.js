import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FoodCard from "./components/FoodCard";
import API_URL from "./config";


const VolunteerPage = () => {
  const user         = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthorized = user?.role === 'volunteer';
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/food/to-transport`, {
          headers: { "x-auth-token": token },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Volunteer fetch failed:", err);
        toast.error("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelivery = (id) => {
    const token = localStorage.getItem("token");
    axios
      .put(`${API_URL}/food/deliver/${id}`, {}, { headers: { "x-auth-token": token } })
      .then(() => {
        toast.success("🎉 Delivery confirmed! The NGO has been notified.");
        setTasks((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => { console.error("Delivery update failed", err); toast.error("Failed to mark delivery."); });
  };

  return (
    <div>
      {/* Header */}
      <div className="sb-page-header">
        <div className="sb-page-icon" style={{ background: 'rgba(96,165,250,0.15)', borderColor: 'rgba(96,165,250,0.3)' }}>🚚</div>
        <div>
          <h1 className="sb-page-title">Volunteer Portal</h1>
          <p className="sb-page-subtitle">Active pickup tasks waiting for your help</p>
        </div>
        {tasks.length > 0 && (
          <span className="sb-badge sb-badge-blue" style={{ marginLeft: 'auto' }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} pending
          </span>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          Loading your tasks…
        </div>
      ) : tasks.length > 0 ? (
        <>
          <div className="sb-section-label">Pending Deliveries</div>
          <div className="sb-grid-3">
            {tasks.map((item) => (
              <FoodCard
                key={item._id}
                item={item}
                buttonText="✅ Mark as Delivered"
                buttonColor="#3b82f6"
                onButtonClick={() => handleDelivery(item._id)}
                isActionAllowed={isAuthorized}
                isEco={item.condition === 'Damaged'}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="sb-empty">
          <div className="sb-empty-icon">🎉</div>
          <div className="sb-empty-text">You're all caught up!</div>
          <div className="sb-empty-sub">No pending pickups right now. Check back soon.</div>
        </div>
      )}
    </div>
  );
};

export default VolunteerPage;
