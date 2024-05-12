import React, { useEffect, useState } from 'react';
import {ref, get} from 'firebase/database';
import { db } from '@/firebase';
import MapWithMarker from "@/Admin/MapComp.tsx";
import {useParams} from "react-router-dom";
import HeaderBar from "@/Donor/HeaderBar.tsx";
import Footer from "@/Donor/footer.tsx";


const Mapsetter3= () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const { CaseNum } = useParams<{ CaseNum: string }>();

    const handleViewloc = async () => {
        try {
            const dbRef = ref(db, `/TeachingPosts/Case${CaseNum}/`);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                setLat(userData.Lat);
                setLng(userData.Lng);
            } else {
                console.log('No data available for CaseNum:', CaseNum);
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };


    useEffect(() => {
        handleViewloc();
    }, []); // Run once when the component mounts

    return (
        <div>
            <HeaderBar/>
            <div style={{textAlign: 'center'}}>
                <h2>This is the location of the Hospital</h2>
            </div>
            {lat && lng && <MapWithMarker lat={lat} lng={lng} />}
            <Footer/>
        </div>
    );
};

export default Mapsetter3;
