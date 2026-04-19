import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const roles = [
  { value: 'donor',     emoji: '🏨', label: 'Hotel / Donor' },
  { value: 'ngo',       emoji: '🤝', label: 'NGO' },
  { value: 'volunteer', emoji: '🚲', label: 'Volunteer' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', username: '', password: '', role: 'donor', address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Account created! Please log in. 🎉');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sb-auth-wrapper">
      <div className="sb-auth-card animate-fade-up" style={{ maxWidth: '500px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'rgba(16,185,129,0.15)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', margin: '0 auto 16px',
          }}>🌿</div>
          <h1 className="sb-auth-title">Join SaveBite</h1>
          <p className="sb-auth-sub">Create your account and start making a difference</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Role picker */}
          <div className="sb-form-group">
            <label className="sb-label">I am a…</label>
            <div className="sb-role-grid">
              {roles.map((r) => (
                <div
                  key={r.value}
                  className={`sb-role-card ${formData.role === r.value ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, role: r.value })}
                >
                  <span className="sb-role-emoji">{r.emoji}</span>
                  <span className="sb-role-name">{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sb-form-grid-2">
            <div className="sb-form-group">
              <label className="sb-label">Full Name</label>
              <input className="sb-input" type="text" name="name" placeholder="Enter your full name" onChange={handleChange} required />
            </div>
            <div className="sb-form-group">
              <label className="sb-label">Username</label>
              <input className="sb-input" type="text" name="username" placeholder="Choose a username" onChange={handleChange} required />
            </div>
          </div>

          <div className="sb-form-group">
            <label className="sb-label">Email Address</label>
            <input className="sb-input" type="email" name="email" placeholder="Enter your email address" onChange={handleChange} required />
          </div>

          <div className="sb-form-group">
            <label className="sb-label">Address</label>
            <input className="sb-input" type="text" name="address" placeholder="Enter your address" onChange={handleChange} />
          </div>

          <div className="sb-form-group">
            <label className="sb-label">Password</label>
            <input className="sb-input" type="password" name="password" placeholder="Create a password" onChange={handleChange} required />
          </div>

          <button
            type="submit"
            className="sb-btn sb-btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '4px', padding: '14px' }}
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <div className="sb-auth-divider" />
        <div className="sb-auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
