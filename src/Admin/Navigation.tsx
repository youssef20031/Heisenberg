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
      <div className="section" style={{backgroundImage: `url('/src/volunteer.jpg')`}} onClick={handleNavigateDonor}>Donor</div>
      <div className="section" style={{backgroundImage: `url('/src/charity.png')`}} onClick={handleNavigateOrg}>Organization</div>
      <div className="section" onClick={handleNavigateAdmin}>Admin</div>
    </div>
  );
};

export default NavigationButtons;