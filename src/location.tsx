import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button } from './components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './LocationComponent.module.css';

const markerIcon = new L.Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationComponent = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);
  const [newLatLng, setNewLatLng] = useState<L.LatLng | null>(null); // State to store the new LatLng
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate(); // Move useNavigate here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newLatLng) {
        console.log("Account created");
        const options = {
          method: 'Post',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, newLatLng })
        }
        const res = await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/OrgLocations.json', options)
        console.log(res);
        if (res) {
          alert("Data inserted");
        } else {
          alert("Error Occurred");
        }
      } else {
        console.error('New LatLng is null');
      }
    } catch (error) {
      console.log(error);
      // setError(error.message); // Set error message state
    }
  };

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const newMap = L.map('map').setView([latitude, longitude], 15); // Adjust the zoom level here

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(newMap);

          const newMarker = L.marker([latitude, longitude], { icon: markerIcon, draggable: true }).addTo(newMap).bindPopup('Your Location');

          setMap(newMap);
          setMarker(newMarker);
          setNewLatLng(newMarker.getLatLng());

          newMarker.on('dragend', () => {
            const newLatLng = newMarker.getLatLng();
            console.log('New Marker Position:', newLatLng);
            setNewLatLng(newLatLng);
          });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <div id="map" className={`${styles.mapContainer} ${styles.flexCenter}`}/>
      <Button
          className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit Location
      </Button>
    </div>
  );
};

export default LocationComponent;
