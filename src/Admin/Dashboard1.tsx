import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Make sure your CSS file is correctly imported
import { Button } from 'react-bootstrap';

const Dashboard1: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleNavigateOrg = () => {
        navigate('/organizationList');
    };

    const HandleNavigatechangepass = () => {
        navigate('/changepassword');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        // You can perform search/filter logic here
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <NavLink to="/dashboard1" className="menu-item">Dashboard</NavLink>
                <NavLink to="/organizationList" className="menu-item">Organization List</NavLink>
                <NavLink to="/donorlist" className="menu-item">Donor List</NavLink>
                {/* Add more NavLink components for other menu items */}
            </div>
            <div className="content" style={{ flexGrow: 1 }}>
                <div className="header">
                    <h1>Dashboard</h1>
                </div>
                <div className="welcome-message">
                    <h2>Welcome Back!</h2>
                    <p>We're glad to see you again. Check out your latest dashboard updates and insights.</p>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by organization name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* You can add a button here for submitting search if needed */}
                </div>
                <Button onClick={HandleNavigatechangepass}>Change password?</Button>
            </div>
        </div>
    );
}

export default Dashboard1;
