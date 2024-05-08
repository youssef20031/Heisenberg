import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase.tsx";
import { Form } from 'react-bootstrap';
import { Button } from "../components/ui/button.tsx";
import { uploadBytes } from "firebase/storage";
import { ref as Ref2 } from 'firebase/storage';
import '@/Designs/SignUpFormShared.css';

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
                navigate(`/location/${email}`);
            }
            else{
                alert("Error Occured");
            }

        } catch (error) {
            console.log(error);
          }
    };


    return (
        <div className="dark-theme-wrapper">
          <Form onSubmit={handleSubmit} className="dark-theme-form">
            <div className="dark-theme-banner">
              <h1>Organization Registration</h1>
            </div>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Email</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setEmail(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Password</Form.Label>
              <Form.Control className="dark-theme-control" type="password" onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">First Name</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setfirstname(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Last Name</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setlastname(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Contact Number</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setnumber(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Gender</Form.Label>
              <Form.Select className="dark-theme-control" onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Governate</Form.Label>
              <Form.Select className="dark-theme-control" onChange={(e) => setgovernate(e.target.value)} required>
                <option value="">Choose a governate</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Al Dakahlia">Al Dakahlia</option>
                <option value="Matrouh">Matrouh</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Address</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setaddress(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Area</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setarea(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Organization Name</Form.Label>
              <Form.Control className="dark-theme-control" type="text" onChange={(e) => setorganizationname(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="dark-theme-group">
              <Form.Label className="dark-theme-label">Charity Organization</Form.Label>
              <Form.Select className="dark-theme-control" onChange={(e) => setorganizationtype(e.target.value)} required>
                <option value="">Select Organization Type</option>
                <option value="Hospital">Hospital</option>
                <option value="Orphanage">Orphanage</option>
                <option value="School">School</option>
                <option value="Refugees">Refugee and people in need</option>
              </Form.Select>
            </Form.Group>
            <div className="dark-theme-group file-upload">
              <label htmlFor="file" className="dark-theme-label">Upload File:</label>
              <input type="file" id="file" className="dark-theme-control" onChange={handleFileChange} required />
            </div>
            <Button type="submit" className="dark-theme-submit">Sign Up</Button>
            {error && <div className="dark-theme-error">{error}</div>}
            <p className="dark-theme-prompt">
              Already Registered?{' '}
              <span className="dark-theme-link" onClick={() => navigate("/SigninOrg")}>Login</span>
            </p>
          </Form>
        </div>
      );
};

export default SignUpFormOrg;