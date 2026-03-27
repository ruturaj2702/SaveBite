import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFakeLogin = (e) => {
    e.preventDefault();
    
    // MOCK LOGIC: If email contains 'hotel', go to donor. If 'ngo', go to ngo.
    if (email.includes('hotel')) {
      navigate('/donor');
    } else if (email.includes('ngo')) {
      navigate('/ngo');
    } else if (email.includes('vol')) {
      navigate('/volunteer');
    } else {
      alert("Please use an email containing 'hotel', 'ngo', or 'vol' for this demo!");
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
        
        <form onSubmit={handleFakeLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. hotel@admin.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-md">
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <span className="text-emerald-600 font-bold cursor-pointer">Register here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;