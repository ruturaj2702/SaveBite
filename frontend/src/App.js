import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from './AuthContext';
import DonorPage from "./DonorPage";
import NgoPage from "./NgoPage";
import VolunteerPage from "./VolunteerPage";
import Home from "./Home";
import Login from './Login';
import Register from './Register';
import './index.css';

/* ── Protected Route ── */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user && !localStorage.getItem('token')) return <Navigate to="/login" replace />;
  return children;
};

/* ── Navbar ── */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sb-nav">
      <div className="sb-nav-logo">
        <span>🥗</span> SaveBite
      </div>

      <div className="sb-nav-links">
        <NavLink to="/home" className={({ isActive }) => `sb-nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/donor" className={({ isActive }) => `sb-nav-link ${isActive ? 'active' : ''}`}>
          Hotel
        </NavLink>
        <NavLink to="/ngo" className={({ isActive }) => `sb-nav-link ${isActive ? 'active' : ''}`}>
          NGO
        </NavLink>
        <NavLink to="/volunteer" className={({ isActive }) => `sb-nav-link ${isActive ? 'active' : ''}`}>
          Volunteer
        </NavLink>

        {user ? (
          /* ── Logged in: avatar + dropdown ── */
          <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '12px' }}>
            <button
              className="sb-avatar-btn"
              onClick={() => setShowDropdown((prev) => !prev)}
              title={`${user.name} (${user.role})`}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=fff&bold=true`}
                alt={user.name}
              />
            </button>

            {showDropdown && (
              <div className="sb-dropdown">
                <div className="sb-dropdown-info">
                  <div className="sb-dropdown-name">{user.name}</div>
                  <div className="sb-dropdown-role">{user.role}</div>
                  <div className="sb-dropdown-id">{user.userId || user.email}</div>
                </div>
                <button className="sb-dropdown-btn" onClick={handleLogout}>
                  ↩&nbsp; Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── Not logged in: show Login + Get Started ── */
          <>
            <NavLink to="/login" className={({ isActive }) => `sb-nav-link ${isActive ? 'active' : ''}`}>
              Login
            </NavLink>
            <NavLink to="/register" className="sb-nav-home-btn">
              Get Started
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

/* ── Footer ── */
const Footer = () => (
  <footer className="sb-footer">
    <div className="sb-footer-inner">
      <div>
        <div className="sb-footer-logo">🥗 SaveBite</div>
        <p className="sb-footer-tagline">
          Revolutionizing food logistics through zero-waste technology. Every meal saved is a life touched.
        </p>
      </div>
      <div>
        <div className="sb-footer-heading">Portals</div>
        <a href="/donor" className="sb-footer-link">Hotel / Donor</a>
        <a href="/ngo" className="sb-footer-link">NGO Dashboard</a>
        <a href="/volunteer" className="sb-footer-link">Volunteer Portal</a>
      </div>
      <div>
        <div className="sb-footer-heading">Support</div>
        <a href="mailto:support@savebite.org" className="sb-footer-link">support@savebite.org</a>
        <a href="/register" className="sb-footer-link">Join the Mission</a>
      </div>
    </div>
    <div className="sb-footer-copy">
      © 2026 SaveBite. All rights reserved. Built with ❤️ to end food waste.
    </div>
  </footer>
);

/* ── App Shell (inside Router so Navbar can use useNavigate) ── */
const AppShell = () => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <div className="sb-main">
      <Routes>
        <Route path="/donor"     element={<ProtectedRoute><DonorPage /></ProtectedRoute>} />
        <Route path="/ngo"       element={<ProtectedRoute><NgoPage /></ProtectedRoute>} />
        <Route path="/volunteer" element={<ProtectedRoute><VolunteerPage /></ProtectedRoute>} />
        <Route path="/home"      element={<Home />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/"          element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          theme="dark"
          toastStyle={{
            background: 'var(--bg-card-2)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
