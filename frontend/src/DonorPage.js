import React from 'react';
import DonorForm from './components/DonorForms';

const DonorPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Donor Dashboard</h1>
    <DonorForm onRefresh={() => alert("Food added! Check the NGO page.")} />
  </div>
);

export default DonorPage;