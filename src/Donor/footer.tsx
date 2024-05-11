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
                            Our system stores the message log data in an MS SQL Server
                            database, ensuring reliable and scalable storage for your
                            monitoring needs. The use of MS SQL Server guarantees high
                            performance and seamless integration with the backend
                            infrastructure.
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
