import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'donor', // Default role
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g. John Doe"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="e.g. pikachurestaurant (will become @hotel)"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="e.g. name@domain.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              name="role" 
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="donor">Hotel / Donor</option>
              <option value="ngo">NGO</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              name="address"
              placeholder="e.g. 123 Green St, City"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-md mt-2">
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
