import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import '@/Designs/EntryPage.css';
import {get, ref} from "firebase/database";
import {db} from "@/firebase.tsx";
const NavigationButton = () => {
    const navigate = useNavigate();
    const { email } = useParams<{ email: string }>();

    const handleNavigateDonate =  () => {
        navigate(`/Home1/${email}`);
    };

    const handleNavigateVolunteer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dbRef = ref(db, '/UserData');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].email === email && userData[key].verified==="True" &&
                    (userData[key].user==="Doctor" || userData[key].user==="Teacher"));
                if(userId){
                    if(userData[userId].user==="Doctor"){
                        navigate('/View_Medical');
                    }
                    else {
                        navigate('/View_Teaching');
                    }
                }
                else{
                    navigate('/notverified');
                }

            }
        } catch (error) {
            console.log(error);

        }

    };

    return (
        <div className="entry-page">
        <div className="container">
            <div className="section" style={{backgroundImage: `url('/src/Donor/volunteerSeif.jpg')`}} onClick={handleNavigateVolunteer}>
                <h1 style={{  color: 'white' }}>Volunteer</h1>
            </div>
            <div className="section" style={{backgroundImage: `url('/src/Donor/lovedonors.jpg')`}} onClick={handleNavigateDonate}>
                <h1 style={{  color: 'white' }}>Donate</h1>
            </div>
        </div>
        </div>
    );
};

export default NavigationButton;