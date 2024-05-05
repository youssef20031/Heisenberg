import React from 'react';

const MedComponent: React.FC = () => {
    return (
        <div
            style={{
                backgroundImage: `url('/src/Donor/MedImage.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            {/* Your component content here */}
        </div>
    );
};

export default MedComponent;
