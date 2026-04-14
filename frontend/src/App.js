import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import DonorPage from "./DonorPage";
import NgoPage from "./NgoPage";
import VolunteerPage from "./VolunteerPage";
import Home from "./Home";
import Login from './Login';
import Register from './Register';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-emerald-600 shadow-lg p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">🥗 SaveBite</h1>
        <div className="space-x-6 font-medium flex items-center">
          <NavLink to="/home" className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold hover:bg-emerald-50 transition-colors duration-300">Home</NavLink>
          
          <NavLink to="/donor" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-emerald-100 border-b-2 border-white' : 'hover:text-emerald-200'}`}>
            Hotel
          </NavLink>
          <NavLink to="/ngo" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-emerald-100 border-b-2 border-white' : 'hover:text-emerald-200'}`}>
            NGO
          </NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-emerald-100 border-b-2 border-white' : 'hover:text-emerald-200'}`}>
            Volunteer
          </NavLink>

          {user ? (
            <div className="relative ml-4">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2 focus:outline-none">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white"/>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 text-gray-800 z-50 border border-gray-100">
                  <div className="px-4 py-3 border-b flex flex-col">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-xs text-emerald-600 font-semibold uppercase">{user.role}</span>
                    <span className="text-xs text-gray-500">{user.userId || user.email}</span>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium">Log out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 ml-4">
              <NavLink to="/login" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-emerald-100 border-b-2 border-white' : 'hover:text-emerald-200'}`}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `transition-colors duration-300 ${isActive ? 'text-emerald-100 border-b-2 border-white' : 'hover:text-emerald-200'}`}>Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-10 mt-20 border-t border-gray-800">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h2 className="text-white font-bold text-lg mb-2">🥗 SaveBite</h2>
        <p className="text-sm">Revolutionizing food logistics through zero-waste technology.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Quick Navigation</h4>
        <div className="flex flex-col space-y-2 text-sm">
          <span>Donor Portal</span>
          <span>NGO Dashboard</span>
          <span>Green Waste Program</span>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-3">Contact Support</h4>
        <p className="text-sm">support@savebite.org</p>
        <p className="text-xs mt-4 text-gray-500">© 2026 SaveBite. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="max-w-6xl mx-auto py-8 px-4">
          <Routes>
            <Route path="/donor" element={<ProtectedRoute><DonorPage /></ProtectedRoute>} />
            <Route path="/ngo" element={<ProtectedRoute><NgoPage /></ProtectedRoute>} />
            <Route path="/volunteer" element={<ProtectedRoute><VolunteerPage /></ProtectedRoute>} />
            <Route
              path="/"
              element={
                <div className="text-center py-20">
                  <h2 className="text-4xl font-extrabold text-gray-800">
                    Bridge the Gap. Feed the Hungry.
                  </h2>
                  <p className="mt-4 text-gray-600 text-lg">
                    A real-time logistics platform for excess food management.
                  </p>
                  <Link
                    to="/donor"
                    className="mt-8 inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
      <Footer />
    </Router>
  );
}

export default App;
