import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import icon from 'leaflet/dist/images/marker-icon.png'; // Import default marker icon
import iconShadow from 'leaflet/dist/images/marker-shadow.png'; // Import marker shadow
import { Button } from './components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './LocationComponent.module.css'; // Import the CSS module

// Create a new marker icon using the default icon and shadow images
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
      if (newLatLng) { // Check if newLatLng is not null
        console.log("Account created");
        const options = {
          method: 'Post',
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, newLatLng }) // Use newLatLng here
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
    // Fetch the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          // Create a Leaflet map centered at the user's location with an adjusted zoom level
          const newMap = L.map('map').setView([latitude, longitude], 15); // Adjust the zoom level here

          // Add a tile layer from OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(newMap);

          // Add a marker at the user's location
          const newMarker = L.marker([latitude, longitude], { icon: markerIcon, draggable: true }).addTo(newMap).bindPopup('Your Location');

          // Set the map and marker state variables
          setMap(newMap);
          setMarker(newMarker);
          setNewLatLng(newMarker.getLatLng()); // Set newLatLng state with initial marker position

          // Listen for dragend event on the marker
          newMarker.on('dragend', () => {
            const newLatLng = newMarker.getLatLng(); // Get the new LatLng after dragend
            console.log('New Marker Position:', newLatLng);
            setNewLatLng(newLatLng); // Update newLatLng state
            // You can perform actions with the new marker position here
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
