import React from 'react';
import Row from "react-bootstrap/Row";
import HeaderBar from "@/Donor/HeaderBar.tsx";
import Footer from "@/Donor/footer.tsx";

const FAQ= () => {
    return (
        <div style={{ backgroundColor: '#f0f0f0'}}>
            <Row>
                <HeaderBar></HeaderBar>
            </Row>
            <h1>Frequently Asked Questions?</h1>
            <h2>Where should I Sign Up</h2>
            <p>According to the user type if you are donor search for the image in the home screen with the label donor
            otherwise if you are an organization press on the arrows to select the other type of user</p>
            <h2>Why does it take too long to get registered?</h2>
            <p>Our System goes through a process where it checks some of your info therefore it may take a while until an
            alert shows up on your screen that you got registered in our database</p>
            <h2>Where should I donate my items</h2>
            <p>Go the donor menu and press the donation post arrows and you will have the choice to donate</p>
            <Row>
                <Footer/>
            </Row>
        </div>
    );
};

export default FAQ;
