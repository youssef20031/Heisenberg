import React from "react";
import "./footer.css";


export default function Footer() {
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>About Us</h4>
                        <p>
                            Our system leverages the capabilities of Firebase for storing message log data,
                            providing a robust and scalable solution for your monitoring requirements.
                            Utilizing Firebase ensures dependable storage while offering seamless integration with the
                            backend infrastructure. With Firebase, we guarantee high performance and reliability,
                            empowering our system to meet your monitoring needs effectively.
                        </p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>More Details?</h4>
                        <a href="/faq">
                            <p>FAQ</p>
                        </a>
                        <a href="/info6">
                            <p>Headquarter location</p>
                        </a>

                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Get in Touch?</h4>
                            <p>Peace.land@yahoo.com</p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Our Team</h4>
                        <p>Omar Walid</p>
                        <p>Seif Eldin</p>
                        <p>Ahmed Sameh</p>
                        <p>Youssef Maged</p>
                        <p>Omar Elshazly</p>
                        <p>Tarek Sherif</p>
                    </div>
                </div>
                <hr></hr>
                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear()} Peace Land. All right reserved.
                        </p>
                    </div>
                    <div className="sb__footer-below-links">

                            <div>
                                <p>Terms & Conditions</p>
                            </div>


                            <div>
                                <p>Privacy</p>
                            </div>


                            <div>
                                <p>Security</p>
                            </div>


                            <div>
                                <p>Cookies</p>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
