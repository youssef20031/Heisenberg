import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapWithMarker: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
    const [position, setPosition] = useState<[number, number]>([lat, lng]);

    useEffect(() => {
        setPosition([lat, lng]);
    }, [lat, lng]);

    return (
        <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Latitude: {position[0]}, Longitude: {position[1]}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapWithMarker;
