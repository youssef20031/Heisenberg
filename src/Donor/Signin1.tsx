import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,db } from "../firebase";

import { ref, get } from 'firebase/database';
import { Button } from "../components/ui/button";
import {Form} from "react-bootstrap";
import "./Sign_in.css";




const Sign_in1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dbRef = ref(db, '/UserData');
            // eslint-disable-next-line no-mixed-spaces-and-tabs
        	const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData).find(key => userData[key].email === email && userData[key].password===password 
            && userData[key].verified === "True");
            if(userId){
                console.log("Log in Successfully");
                navigate("/Home1"); 
            }

        }
    } catch (error) {
            console.log(error);
            
        }
    };

       return (
        <div className="sign-in-wrapper">
            <Form onSubmit={handleSubmit} className="sign-in-form">
                <div className="banner">
                    <h1>Sign In</h1>
                </div>
                <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Button type="submit" id="submit" className="submit-btn">Login</Button>
                {error && <p className="error-message">{error}</p>} {/* Apply the error message class */}
                <p className="sign-up-prompt">Don't have an account?<Link to="/SignUpForm1" className="sign-up-link">Sign Up</Link></p>
            </Form>
        </div>
    );
};

export default Sign_in1;
