import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DonorPage from "./DonorPage";
import NgoPage from "./NgoPage";
import VolunteerPage from "./VolunteerPage";
import Home from "./Home";
import Login from './Login';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-10 mt-20 border-t border-gray-800">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div>
        <h3 className="text-white font-bold text-lg mb-2">🥗 SaveBite</h3>
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
        {/* NAVBAR */}
        <nav className="bg-emerald-600 shadow-lg p-4 text-white">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">🥗 SaveBite</h1>
            <div className="space-x-6 font-medium">
              <Link to="/home" className="text-2xl font-bold tracking-tight">Home</Link>
              <Link to="/login" className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-bold hover:bg-emerald-50 transition">Login</Link>
              <Link to="/donor" className="hover:text-emerald-200 transition">
                Hotel
              </Link>
              <Link to="/ngo" className="hover:text-emerald-200 transition">
                NGO
              </Link>
              <Link
                to="/volunteer"
                className="hover:text-emerald-200 transition"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="max-w-6xl mx-auto py-8 px-4">
          <Routes>
            <Route path="/donor" element={<DonorPage />} />
            <Route path="/ngo" element={<NgoPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
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
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
      <Footer />
    </Router>
  );
}
 


export default App;
