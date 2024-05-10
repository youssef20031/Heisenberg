import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";





const TeacherLogin = () => {
  const navigate = useNavigate();
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
        body:JSON.stringify({email,specialty,probonoCases})
    }
    const res= await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/teacherinfo.json' , options)
    console.log("Specialty:", specialty);
    console.log("Probono Cases:", probonoCases);
    // After handling submission, you might navigate to another page
    navigate("/Sign_in1"); // Example navigation
  };

  return (
    <div className="dark-theme-wrapper">
      <form onSubmit={handleSubmit} className="dark-theme-form">
        <div className="dark-theme-banner">
          <h1>Teacher Login</h1>
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

export default TeacherLogin;
