import React, { useEffect, useState } from 'react';
import {ref, get, update} from 'firebase/database';
import { db } from '@/firebase';
import Mapgetter from '@/Donor/LocationCompForMedical.tsx';
import {useParams} from "react-router-dom";


const Mapsetter= () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const { CaseNum } = useParams<{ CaseNum: string }>();

    const handleViewloc = async () => {
        try {
            const dbRef = ref(db, `/MedicaCase`);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].CaseNum === CaseNum);
                if (userId) {
                    // Update the verification column to true
                    const latLngData = userData[userId];
                    setLat(latLngData.lat);
                    setLng(latLngData.lng);
                } else {
                    console.log('No user found with caseNu,:', CaseNum);
                }
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error updating verification status:', error);
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

export default Mapsetter;
