import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {get, ref, update} from "firebase/database";
import {db} from "@/firebase.tsx";





const TeacherLogin = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [probonoCases, setProbonoCases] = useState("");
  const { email } = useParams<{ email: string }>();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission, such as sending the data to a server or processing it in some way
    const dbRef = ref(db, '/UserData');
    const snapshot = await get(dbRef);
try{
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userId = Object.keys(userData).find(key => userData[key].email === email);

      if (userId) {
        await update(ref(db, `UserData/${userId}`), { Speciality: specialty ,ProbonoCase: probonoCases });
        navigate('/Sign_in1');
      } else {
        console.log('No user found with email:', email);
      }
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error updating verification status:', error);
  }
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
