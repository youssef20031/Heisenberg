// ImageButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ImageButton.css';

interface ImageButtonProps {
    imagePath: string;
    link: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imagePath, link }) => {
    return (
        React.createElement('div', { className: 'image-button', style: { backgroundImage: `url(${imagePath})` } },
            React.createElement(Link, { to: link })
        )
    );
};

export default ImageButton;
