import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { identifier, password });
      const { token, user } = res.data;
      
      // Save session
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success('Login successful!');

      // Redirect based on role
      if (user.role === 'donor') {
        navigate('/donor');
      } else if (user.role === 'ngo') {
        navigate('/ngo');
      } else if (user.role === 'volunteer') {
        navigate('/volunteer');
      } else {
        navigate('/home');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or User ID</label>
            <input 
              type="text" 
              placeholder="e.g. john@domain.com or pikachu@hotel"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={(e) => setIdentifier(e.target.value)}
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
          Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;