import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FoodCard from "./components/FoodCard";
import API_URL from "./config";


const NgoPage = () => {
  const user         = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthorized = user?.role === 'ngo';
  const [availableFood, setAvailableFood] = useState([]);
  const [activeTab, setActiveTab]         = useState("human");
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/food/available`, { headers: { "x-auth-token": token } })
      .then((res) => { setAvailableFood(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  const handleClaim = (id) => {
    const token = localStorage.getItem("token");
    axios.put(`${API_URL}/food/claim/${id}`, {}, { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.data.food?.status === 'claimed') {
          toast.success("✅ Food claimed! Volunteers will be notified.");
          setAvailableFood((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch((err) => { console.error("Claim Error:", err); toast.error("Failed to claim food."); });
  };

  const freshFood   = availableFood.filter((i) => String(i.condition || 'Fresh').trim().toLowerCase() === 'fresh');
  const damagedFood = availableFood.filter((i) => String(i.condition || '').trim().toLowerCase() === 'damaged');

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="sb-page-header" style={{ margin: 0 }}>
          <div className="sb-page-icon">🤝</div>
          <div>
            <h1 className="sb-page-title">NGO Dashboard</h1>
            <p className="sb-page-subtitle">Browse and claim available food listings</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="sb-tabs">
          <button
            className={`sb-tab ${activeTab === 'human' ? 'active-green' : ''}`}
            onClick={() => setActiveTab('human')}
          >
            🥗 Human Food
            {freshFood.length > 0 && (
              <span style={{
                marginLeft: '8px', background: 'var(--brand)', color: 'var(--bg-base)',
                borderRadius: '99px', fontSize: '10px', fontWeight: 800,
                padding: '1px 7px', display: 'inline-block',
              }}>{freshFood.length}</span>
            )}
          </button>
          <button
            className={`sb-tab ${activeTab === 'eco' ? 'active-amber' : ''}`}
            onClick={() => setActiveTab('eco')}
          >
            🍂 Green Waste
            {damagedFood.length > 0 && (
              <span style={{
                marginLeft: '8px', background: '#d97706', color: '#fff',
                borderRadius: '99px', fontSize: '10px', fontWeight: 800,
                padding: '1px 7px', display: 'inline-block',
              }}>{damagedFood.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          Loading food listings…
        </div>
      ) : activeTab === 'human' ? (
        <div>
          <div className="sb-section-label">Available Meals — {freshFood.length} listing{freshFood.length !== 1 ? 's' : ''}</div>
          {freshFood.length > 0 ? (
            <div className="sb-grid-3">
              {freshFood.map((item) => (
                <FoodCard
                  key={item._id}
                  item={item}
                  buttonColor="#10b981"
                  buttonText="Claim Meal"
                  onButtonClick={() => handleClaim(item._id)}
                  isActionAllowed={isAuthorized}
                />
              ))}
            </div>
          ) : (
            <div className="sb-empty">
              <div className="sb-empty-icon">🥗</div>
              <div className="sb-empty-text">No fresh food available right now</div>
              <div className="sb-empty-sub">Check back soon — donors are actively listing!</div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="sb-section-label" style={{ color: '#d97706' }}>Compost & Manure Redirect — {damagedFood.length} listing{damagedFood.length !== 1 ? 's' : ''}</div>
          {damagedFood.length > 0 ? (
            <div className="sb-grid-3">
              {damagedFood.map((item) => (
                <FoodCard
                  key={item._id}
                  item={item}
                  buttonText="Claim for Manure"
                  buttonColor="#d97706"
                  isEco={true}
                  onButtonClick={() => handleClaim(item._id)}
                  isActionAllowed={isAuthorized}
                />
              ))}
            </div>
          ) : (
            <div className="sb-empty">
              <div className="sb-empty-icon">🍂</div>
              <div className="sb-empty-text">No green waste listings available</div>
              <div className="sb-empty-sub">Damaged food listings will appear here for composting.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NgoPage;
