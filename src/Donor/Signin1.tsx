import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { ref, get } from 'firebase/database';
import { Button } from "../components/ui/button";
import { Form } from "react-bootstrap";
import '@/Designs/SignUpFormShared.css';

const Signin1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Error state
    const [userId, setUserId] = useState<string | null>(null); // State to store user ID
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dbRef = ref(db, '/UserData');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const foundUserId = Object.keys(userData).find(key => userData[key].email === email && userData[key].password === password);
                if (foundUserId) {
                    console.log("Log in Successfully");
                    setError(null); // Reset error state
                    setUserId(foundUserId); // Store user ID in state
                    navigate(`/DonorXVolunteer/${email}`);
                } else {
                    setError("Invalid email or password"); // Set error message
                }
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred while signing in"); // Set error message
        }
    };

    return (
        <div className="dark-theme-wrapper">
          <Form onSubmit={handleSubmit} className="dark-theme-form">
            <div className="dark-theme-banner">
              <h1>Sign In</h1>
            </div>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Email</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Password</Form.Label>
              <Form.Control className="dark-theme-control" type="password" onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            <Button type="submit" className="dark-theme-submit">Login</Button>
            {error && <div className="dark-theme-error">{error}</div>}
            <p className="dark-theme-prompt">
              Don't have an account?
              <Link to="/SignUpFormDonor" className="dark-theme-link">Sign Up</Link>
            </p>
          </Form>
        </div>
      );
};

export default Signin1;
