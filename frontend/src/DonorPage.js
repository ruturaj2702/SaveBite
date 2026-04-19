import React from 'react';
import DonorForm from './components/DonorForms';

const DonorPage = () => {
  const user         = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthorized = user?.role === 'donor';

  return (
    <div>
      <div className="sb-page-header">
        <div className="sb-page-icon">🏨</div>
        <div>
          <h1 className="sb-page-title">Hotel Dashboard</h1>
          <p className="sb-page-subtitle">Manage and publish your excess food donations</p>
        </div>
      </div>

      {isAuthorized ? (
        <DonorForm onRefresh={() => {}} />
      ) : (
        <div className="sb-read-only">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Read-Only Mode</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            You are logged in as a <span style={{ color: 'var(--brand-light)', fontWeight: 600 }}>{user?.role?.toUpperCase()}</span>.
            Only Hotel / Donor accounts can publish food donations.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorPage;