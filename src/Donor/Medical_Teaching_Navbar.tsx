import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
    return (
        <div style={{ backgroundColor: '#2196f3', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontSize: '18px', padding: '5px', borderRadius: '5px', backgroundColor: 'blue', display: 'inline-block' }}>About</Link>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontSize: '18px', padding: '5px', borderRadius: '5px', backgroundColor: 'red', display: 'inline-block' }}>Log Out</Link>
            </div>
        </div>
    );
};

export default HeaderBar;