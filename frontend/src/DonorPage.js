import React from 'react';
import DonorForm from './components/DonorForms';

const DonorPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthorized = user?.role === 'donor';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Donor Dashboard</h1>
      {isAuthorized ? (
        <DonorForm onRefresh={() => alert("Food added! Check the NGO page.")} />
      ) : (
        <div className="bg-gray-100 p-8 rounded-3xl border-2 border-dashed border-gray-300 text-center py-20">
          <p className="text-gray-500 font-medium text-lg">
            Read-Only Mode
          </p>
          <p className="text-gray-400 mt-2">
            You are logged in as a {user?.role?.toUpperCase()}. Only Hotel/Donor accounts can publish food donations.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorPage;