import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: '🏨',
    title: 'Hotels List',
    desc: 'Donors upload details of quality excess food in seconds — name, quantity, expiry.',
  },
  {
    icon: '🤝',
    title: 'NGOs Claim',
    desc: 'Verified organisations claim available food listings for their communities instantly.',
  },
  {
    icon: '🚲',
    title: 'Volunteers Deliver',
    desc: 'Local heroes pick up from the donor and safely deliver to the NGO.',
  },
];

const Home = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>

    {/* ── HERO ── */}
    <section className="sb-hero animate-fade-up">
      <div className="sb-hero-eyebrow">
        <span>🌿</span> Zero Food Waste Platform
      </div>
      <h1 className="sb-hero-title">
        Stop Waste.<br /><span>Start Sharing.</span>
      </h1>
      <p className="sb-hero-sub">
        Connecting hotels with excess food to NGOs and volunteers in real-time.
        Every meal saved is a life touched.
      </p>
      <div className="sb-hero-actions">
        <Link to="/donor" className="sb-btn sb-btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>
          🍱 Donate Food
        </Link>
        <Link to="/ngo" className="sb-btn sb-btn-outline" style={{ fontSize: '15px', padding: '14px 32px' }}>
          Find Meals →
        </Link>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section>
      <div className="sb-section-label">How it works</div>
      <div className="sb-grid-3">
        {steps.map((step, i) => (
          <div key={i} className="sb-step-card animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="sb-step-icon">{step.icon}</div>
            <div className="sb-step-title">{step.title}</div>
            <div className="sb-step-desc">{step.desc}</div>
            <div style={{
              marginTop: '20px',
              width: '28px',
              height: '3px',
              background: 'var(--brand)',
              borderRadius: '99px',
              margin: '20px auto 0',
            }} />
          </div>
        ))}
      </div>
    </section>

    {/* ── MISSION ── */}
    <section className="sb-mission">
      <div className="sb-hero-eyebrow" style={{ marginBottom: '20px' }}>
        <span>🌍</span> Our Mission
      </div>
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.03em' }}>
        Technology bridging<br />abundance and need
      </h2>
      <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.8 }}>
        Founded in 2026, <strong style={{ color: 'var(--brand-light)' }}>SaveBite</strong> was built to solve the disconnect
        between food surplus and food scarcity. We believe no good meal should go to waste
        while people are still hungry.
      </p>
      <Link to="/register" className="sb-btn sb-btn-primary" style={{ fontSize: '15px', padding: '14px 36px' }}>
        Join the Mission 🚀
      </Link>
    </section>

  </div>
);

export default Home;