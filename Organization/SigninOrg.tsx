import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,db } from "../firebase";
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
        const userId = Object.keys(userData).find(key => userData[key].email === email && userData[key].password===password 
            && userData[key].verification === "True");
            if(userId){
                console.log("Log in Successfully");
                navigate("/Home2"); 
            }
            

        }
    } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">
                    Email
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className="inputfields"/> {/* Use e.target.value to get the input value */}
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="inputfields"/> {/* Use e.target.value to get the input value */}
                </label>
                <Button type="submit" id="submit" style={{ backgroundColor: 'rgb(120 120 163)'}} className="flex-center gap-2" >Login</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Render the error message if it exists */}
                <p>Don't have an account?<Link to="/SignUpForm2">Sign Up</Link></p> {/* Link to the Sign Up page */}
            </form>
        </div>
    );
};

export default SigninOrg;
