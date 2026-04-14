import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Stop Waste. <span className="text-emerald-600">Start Sharing.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Connecting hotels with excess food to NGOs and volunteers in real-time. 
          Every meal saved is a life touched.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/donor" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-lg transition-all hover:-translate-y-1">
            Donate Food
          </Link>
          <Link to="/ngo" className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all">
            Find Meals
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4">🏨</div>
          <h3 className="text-xl font-bold mb-2">Hotels List</h3>
          <p className="text-gray-500">Donors upload details of quality excess food in seconds.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">NGOs Claim</h3>
          <p className="text-gray-500">Verified organizations claim available food for their communities.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-3xl mb-4">🚲</div>
          <h3 className="text-xl font-bold mb-2">Volunteers Deliver</h3>
          <p className="text-gray-500">Local heroes pick up and drop off the food safely.</p>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="bg-emerald-900 text-white p-12 rounded-3xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Founded in 2026, <strong>SaveBite</strong> was built to solve the disconnect 
            between food surplus and food scarcity. We believe that technology can 
            bridge the gap between abundance and need, ensuring that no good meal 
            goes to waste while people are still hungry.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;