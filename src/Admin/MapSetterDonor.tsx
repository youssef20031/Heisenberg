import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '@/firebase';
import Mapgetter from "@/Admin/MapComp.tsx";
import {useParams} from "react-router-dom";

const MapSetterDonor= () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);

    const handleViewloc = async () => {
        try {
            const dbRef = ref(db, '/OrgLocations');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].email === "omar.walid35221@yahoo.com");
                if (userId) {
                    const dbRef2 = ref(db, `/OrgLocations/${userId}/newLatLng`);
                    const snapshot2 = await get(dbRef2);
                    if (snapshot2.exists()) {
                        const latLngData = snapshot2.val();
                        setLat(latLngData.lat);
                        setLng(latLngData.lng);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        handleViewloc();
    }, []); // Run once when the component mounts

    return (
        <div>
            {lat && lng && <Mapgetter lat={lat} lng={lng} />}

        </div>
    );
};

export default MapSetterDonor;
