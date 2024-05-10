import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [governate, setGovernate] = useState("");
  const [googleMarker, setGoogleMarker] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [probonoCases, setProbonoCases] = useState("");
  const { email } = useParams<{ email: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission, such as sending the data to a server or processing it in some way
    const options={
        method:'Post',
        header:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email,address, area, governate, googleMarker, specialty, probonoCases})
    }
    const res= await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/doctorinfo.json' , options)
    console.log("Address:", address);
    console.log("Area:", area);
    console.log("Governate:", governate);
    console.log("Google Marker:", googleMarker);
    console.log("Specialty:", specialty);
    console.log("Probono Cases:", probonoCases);
    // After handling submission, you might navigate to another page
    navigate("/Sign_in1"); // Example navigation
  };

  return (
    <div className="dark-theme-wrapper">
      <form onSubmit={handleSubmit} className="dark-theme-form">
        <div className="dark-theme-banner">
          <h1>Doctor Login</h1>
        </div>
        <div className="dark-theme-group">
          <label htmlFor="address" className="dark-theme-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <div className="dark-theme-group">
          <label htmlFor="area" className="dark-theme-label">
            Area
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <div className="dark-theme-group">
          <label htmlFor="governate" className="dark-theme-label">
            Governate
          </label>
          <input
            type="text"
            id="governate"
            value={governate}
            onChange={(e) => setGovernate(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <div className="dark-theme-group">
          <label htmlFor="googleMarker" className="dark-theme-label">
            Google Marker
          </label>
          <input
            type="text"
            id="googleMarker"
            value={googleMarker}
            onChange={(e) => setGoogleMarker(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <div className="dark-theme-group">
          <label htmlFor="specialty" className="dark-theme-label">
            Specialty
          </label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <div className="dark-theme-group">
          <label htmlFor="probonoCases" className="dark-theme-label">
            Probono Cases
          </label>
          <input
            type="number"
            id="probonoCases"
            value={probonoCases}
            onChange={(e) => setProbonoCases(e.target.value)}
            className="dark-theme-control"
            required
          />
        </div>
        <Button type="submit" className="dark-theme-submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default DoctorLogin;
