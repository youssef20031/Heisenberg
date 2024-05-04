import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import '@/Designs/EntryPage.css';
const NavigationButton = () => {
    const navigate = useNavigate();

    const handleNavigateDonate = () => {
        navigate('/Home1');
    };

    const handleNavigateVolunteer = () => {
        navigate('/View_Medical');
    };

    return (
        <div className="entry-page">
            <div className="section" style={{backgroundImage: `url('/src/Donor/volunteerSeif.jpg')`}} onClick={handleNavigateVolunteer}>
                <h1 style={{  color: 'white' }}>Volunteer</h1>
            </div>
            <div className="section" style={{backgroundImage: `url('/src/Donor/donations.jpg')`}} onClick={handleNavigateDonate}>
                <h1 style={{  color: 'white' }}>Donate</h1>
            </div>
        </div>
    );
};

export default NavigationButton;