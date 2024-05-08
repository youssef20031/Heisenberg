import '@/Designs/SignUpFormShared.css';
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
        <div className="dark-theme-wrapper">
          <div className="dark-theme-form">
            <form onSubmit={handleSubmit}>
              <div className="dark-theme-banner">
                <h1>Login</h1>
              </div>
              <div className="dark-theme-group">
                <label htmlFor="email" className="dark-theme-label">
                  Email
                  <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} className="dark-theme-control" required/>
                </label>
              </div>
              <div className="dark-theme-group">
                <label htmlFor="password" className="dark-theme-label">
                  Password
                  <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="dark-theme-control" required/>
                </label>
              </div>
              <Button type="submit" className="dark-theme-submit">Login</Button>
              {error && <div className="dark-theme-error">{error}</div>}
              <p className="dark-theme-prompt">
                Don't have an account?{' '}
                <Link to="/SignUpOrg" className="dark-theme-link">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      );
};

export default SigninOrg;
