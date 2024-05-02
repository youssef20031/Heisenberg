import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth,storage } from "../firebase.tsx";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Col } from 'react-bootstrap';
import { Button } from "../components/ui/button.tsx";
import "./SignUpOrg.css";
import { uploadBytes } from "firebase/storage";
import { ref as Ref2 } from 'firebase/storage';


const SignUpFormOrg =() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [gender, setGender] = useState('');
    const [number, setnumber] = useState('');
    const [organizationname, setorganizationname] = useState('');
    const [organizationtype, setorganizationtype] = useState('');
    const [address, setaddress] = useState('');
    const [area, setarea] = useState('');
    const [governate, setgovernate] = useState('');
    const [error, setError] = useState(null); // State to manage error message
    const verification="False";
    const [file, setFile] = useState<File | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password); // Use await to wait for the authentication to complete

            <h1>You go registered now Login</h1>
            console.log("Account created");
            const options={
                method:'Post',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,firstname,lastname,password,gender,number,area,address,governate,organizationname,organizationtype,verification})
            }
            const res= await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/OrganizationData.json' , options)
            console.log(res);
            
            if (file) { 
                const storageRef = Ref2(storage, `${email}`);
                await uploadBytes(storageRef, file);
            }
            if(res){
                alert("You got registered now login");
            }
            else{
                alert("Error Occured");
            }

        } catch (error) {
            console.log(error);
            // setError(error.message); // Set error message state
          }
    };

    return (
        <div className="signup-wrapper" >
            <Form onSubmit={handleSubmit} className="signup-form">
                <div className="banner">
                    <h1>Organization Registration</h1>
                </div>
                <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => setfirstname(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => setlastname(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" onChange={(e) => setnumber(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={(e) => setGender(e.target.value)} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Governate</Form.Label>
                    <Form.Select onChange={(e) => setgovernate(e.target.value)} required>
                        <option value="Cairo">Cairo</option>
                        <option value="Alexandria">Alexandria</option>
                        <option value="Al Dakahlia">Al Dakahlia</option>
                        <option value="Matrouh">Matrouh</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" onChange={(e) => setaddress(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Area</Form.Label>
                    <Form.Control type="text" onChange={(e) => setarea(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control type="text" onChange={(e) => setorganizationname(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>Charity Organization</Form.Label>
                    <Form.Select onChange={(e) => setorganizationtype(e.target.value)} required>
                        <option value="Hospital">Hospital</option>
                        <option value="Orphanage">Orphanage</option>
                        <option value="School">School</option>
                        <option value="Refugees">Refugee and people in need</option>
                    </Form.Select>
                </Form.Group>

                <div className="form-group file-upload">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input type="file" id="file" className="form-control" onChange={handleFileChange} required />
                </div>

                <Button type="submit"
                        className="submit-btn">Sign Up</Button>
                {error && <h1>{error}</h1>} {/* Render error message if exists */}
                <p className="login-prompt">Already Registered? <span className="login-link"
                                                                      onClick={() => navigate("/SigninOrg")}>Login</span>
                </p>
            </Form>
        </div>
    );
};

export default SignUpFormOrg;