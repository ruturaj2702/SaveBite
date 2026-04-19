import React from "react";

const FoodCard = ({ item, buttonText, buttonColor, onButtonClick, isActionAllowed = true, isEco = false }) => {
  const accentColor = isEco ? '#d97706' : (buttonColor || '#10b981');
  const expiryDate  = item.expiryTime ? new Date(item.expiryTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
  const donorName   = item.donorId?.name    || null;
  const donorAddr   = item.donorId?.address || null;
  const ngoName     = item.ngoId?.name      || null;

  return (
    <div className="sb-food-card">
      {/* Accent bar */}
      <div className="sb-food-card-accent" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />

      <div className="sb-food-card-body">
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '8px' }}>
          <h3 className="sb-food-card-name" style={{ flex: 1 }}>{item.foodName}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
            <span className={`sb-badge ${isEco ? 'sb-badge-amber' : 'sb-badge-green'}`}>
              {isEco ? '🍂 ECO' : '🥗 FOOD'}
            </span>
            <span className="sb-badge sb-badge-blue" style={{ fontSize: '10px' }}>
              {item.foodType}
            </span>
          </div>
        </div>

        {/* Info rows */}
        <div className="sb-food-card-row">
          <span>📦</span>
          <span>Qty: <strong>{item.quantity}</strong></span>
        </div>
        <div className="sb-food-card-row">
          <span>⏰</span>
          <span>Expires: <strong>{expiryDate}</strong></span>
        </div>
        {donorName && (
          <div className="sb-food-card-row">
            <span>🏨</span>
            <span><strong>{donorName}</strong></span>
          </div>
        )}
        {donorAddr && (
          <div className="sb-food-card-row">
            <span>📍</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{donorAddr}</span>
          </div>
        )}
        {ngoName && (
          <div className="sb-food-card-row">
            <span>🤝</span>
            <span><strong>{ngoName}</strong></span>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="sb-food-card-actions">
        <button
          onClick={() => { if (isActionAllowed && onButtonClick) onButtonClick(item._id); }}
          disabled={!isActionAllowed}
          className="sb-btn"
          style={{
            width: '100%',
            background: isActionAllowed ? accentColor : 'transparent',
            color: isActionAllowed ? '#0a0f0d' : 'var(--text-muted)',
            border: isActionAllowed ? 'none' : '1px solid var(--border)',
            fontWeight: 700,
            padding: '11px',
            cursor: isActionAllowed ? 'pointer' : 'not-allowed',
            opacity: isActionAllowed ? 1 : 0.5,
          }}
        >
          {isActionAllowed ? buttonText : '🔒 Read-Only'}
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
