import React, {useEffect} from 'react';
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import '@/Designs/EntryPage.css';
import {get, ref} from "firebase/database";
import {db} from "@/firebase.tsx";
import "@/Designs/EntryPage.css";

const NavigationButton = () => {
    const navigate = useNavigate();
    const { email } = useParams<{ email: string }>();

    const handleNavigateDonate =  () => {
        navigate(`/Home1/${email}`);
    };
    //write a function that checks if there is a transportation notification for the user
    const handleIfTransportationNotificationExists = async () => {
    try {
        const dbRef = ref(db, '/TransportationForDonation');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const transportationData = snapshot.val();
            const userIds = Object.keys(transportationData).filter(key => transportationData[key].DonorEmail === email);

            for (const userId of userIds) {
                //check if the date is today
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                const [year, month, day] = transportationData[userId].Date.split('-');
                const chosenDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
                chosenDate.setHours(0, 0, 0, 0);

                if(+currentDate === +chosenDate){
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        console.log("Error: ", error);
        return false;
    }
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
    const checkNotification = async () => {
        const notificationExists = await handleIfTransportationNotificationExists();
        if (notificationExists) {
            alert("You have a transportation notification. Please check your email.");
        }
    };

// Call the function
    useEffect(() => {
        checkNotification();
    }, []);

    const Navbar = () => {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar__home-link">Home</Link>
            </nav>
        );
    };

    return (
        <div>
            <div className="dashboard-container">
                <div className="sidebar">
                    <NavLink to="/" className="menu-item">Sign Out</NavLink>
                    {}
                </div>
                <div className="content">
                    <div className="section" style={{backgroundImage: `url('/src/Donor/volunteerSeif.jpg')`}}
                         onClick={handleNavigateVolunteer}>
                        <h1 style={{color: 'white'}}>Volunteer</h1>
                    </div>
                    <div className="section" style={{backgroundImage: `url('/src/Donor/lovedonors.jpg')`}}
                         onClick={handleNavigateDonate}>
                        <h1 style={{color: 'white'}}>Donate</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationButton;