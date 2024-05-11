import Row from "react-bootstrap/Row";
import HeaderBar from "@/Donor/HeaderBar.tsx";
import React from "react";
import Footer from "@/Donor/footer.tsx";

const About = () => {
    return (
        <div style={{backgroundColor: '#f0f0f0'}}>
            <Row>
                <HeaderBar></HeaderBar>
            </Row>
            <h1>About Us</h1>
            <p>Welcome to our company! We are dedicated to providing the best services in our industry.</p>
            <h2>Our Team</h2>
            <p>Our team consists of highly skilled professionals who are committed to delivering excellence in
                everything we do.</p>
            <h2>Contact Information</h2>
            <p>Phone: 01273660301</p>
            <p>Email: peace.land@gmail.com</p>
            <h2>Establishment Date</h2>
            <p>Our company was established in 2021 with the aim of revolutionizing the industry.</p>
            <Row>
                <Footer/>
            </Row>
        </div>

    );
};

export default About;