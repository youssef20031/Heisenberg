import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import '@/Designs/EntryPage.css';
import Organization from '@/Organization/Organization';
const NavigationButtons = () => {
  const navigate = useNavigate();

  const handleNavigateDonor = () => {
    navigate('/donor');
  };

  const handleNavigateAdmin = () => {
    navigate('/admin');
  };

  const handleNavigateOrg = () => {
    navigate('/organization');
  };

  return (
    <div className="entry-page">
      <div className="section" style={{backgroundImage: `url('/src/volunteer.jpg')`}} onClick={handleNavigateDonor}>
        <h1 style={{  color: 'white' }}>Donor</h1>
      </div>
      <div className="section" style={{backgroundImage: `url('/src/charity.png')`}} onClick={handleNavigateOrg}>
        <h1 style={{  color: 'white' }}>Organization</h1>
      </div>
      <div className="section" style={{backgroundImage: `url('/src/Admin.jpg')`}} onClick={handleNavigateAdmin}>
      <h1 style={{  color: 'black' }}>Admin</h1>
      </div>
    </div>
  );
};

export default NavigationButtons;