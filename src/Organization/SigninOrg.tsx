import "./SigninOrg.css";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from 'firebase/database';
import { Button } from "../components/ui/button";

const SigninOrg = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dbRef = ref(db, '/OrganizationData');
            const snapshot = await get(dbRef);
  
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].email === email && userData[key].password === password && userData[key].verification === "True");
                if (userId) {
                    console.log("Log in Successfully");
                    navigate(`/Home2/${email}`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="sign-in-wrapper">
            <div className="sign-in-form">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                            <input type="text" onChange={(e) => setEmail(e.target.value)} className="inputfields"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="inputfields"/>
                        </label>
                    </div>
                    <Button type="submit" id="submit" className="submit-btn">Login</Button>
                    {error && <p className="error-message">{error}</p>}
                    <p className="login-prompt">Don't have an account? <Link to="/SignUpForm2" className="login-link">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SigninOrg;
