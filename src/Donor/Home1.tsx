import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <div>
                <Link to="/ongoing-donations" style={linkStyle}>View ongoing donations</Link>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
                <input type="text" placeholder="Search Organizations" style={searchInputStyle} />
            </div>
            <div style={{ textAlign: 'right' }}>
                {/* Add any other navigation links/buttons here */}
            </div>
        </nav>
    );
};

const navStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
};

const searchInputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    width: '300px',
    marginRight: '10px',
};

export default Navbar;
