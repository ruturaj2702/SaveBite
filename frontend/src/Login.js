import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import API_URL from './config';

const Login = () => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [loading, setLoading]        = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { identifier, password });
      const { token, user } = res.data;
      login(user, token);          // ← updates React state + localStorage atomically
      toast.success('Welcome back! 👋');
      if (user.role === 'donor')          navigate('/donor');
      else if (user.role === 'ngo')       navigate('/ngo');
      else if (user.role === 'volunteer') navigate('/volunteer');
      else navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sb-auth-wrapper">
      <div className="sb-auth-card animate-fade-up">

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'rgba(16,185,129,0.15)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', margin: '0 auto 16px',
          }}>🥗</div>
          <h1 className="sb-auth-title">Welcome back</h1>
          <p className="sb-auth-sub">Sign in to your SaveBite account</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sb-form-group">
            <label className="sb-label">Email or User ID</label>
            <input
              className="sb-input"
              type="text"
              placeholder="Enter your email or User ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="sb-form-group">
            <label className="sb-label">Password</label>
            <input
              className="sb-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="sb-btn sb-btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '8px', padding: '14px' }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="sb-auth-divider" />
        <div className="sb-auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;