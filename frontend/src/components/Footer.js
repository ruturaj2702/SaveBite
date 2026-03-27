const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Brand Section */}
      <div className="space-y-4">
        <h3 className="text-white text-xl font-bold flex items-center gap-2">
          🥗 SaveBite
        </h3>
        <p className="text-sm leading-relaxed">
          Optimizing food logistics to eliminate waste and support sustainable community ecosystems.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Platform</h4>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-emerald-400 cursor-pointer transition">Donor Portal</li>
          <li className="hover:text-emerald-400 cursor-pointer transition">NGO Dashboard</li>
          <li className="hover:text-emerald-400 cursor-pointer transition">Volunteer Network</li>
        </ul>
      </div>

      {/* Impact Section */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Sustainability</h4>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-amber-400 cursor-pointer transition">Green Waste Program</li>
          <li className="hover:text-amber-400 cursor-pointer transition">Manure Diversion</li>
          <li className="hover:text-amber-400 cursor-pointer transition">Zero-Landfill Policy</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Contact</h4>
        <p className="text-sm">support@savebite.org</p>
        <div className="flex gap-4 mt-4">
          <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">in</span>
          <span className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">tw</span>
        </div>
      </div>
    </div>
    
    <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
      <p>© 2026 SaveBite Logistics. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;