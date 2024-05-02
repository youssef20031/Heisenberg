import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth,storage } from "../firebase.tsx";
import { ref } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Col } from 'react-bootstrap';
import { Button } from "../components/ui/button.tsx";
import { uploadBytes } from "firebase/storage";
import './SignUpFormDonor.css';



const SignUpFormDonor =() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [gender, setGender] = useState('');
    const [number, setnumber] = useState('');
    const [address, setaddress] = useState('');
    const [area, setarea] = useState('');
    const [governate, setGovernate] = useState('');
    const [user, setUser] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [error] = useState(null); // State to manage error message
    const[verified]=useState('False');
    const[Organization]=useState('Not assigned');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const options={
                method:'Post',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,firstname,lastname,password,gender,number,area,address,governate,user,Organization,verified})
            }
            const res= await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/UserData.json' , options)
            console.log(res);
            console.log("Account created");
            if (file) { 
                const storageRef = ref(storage, `${email}`);
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
        <div className="signup-wrapper">

            <form onSubmit={handleSubmit} className="signup-form">
                <div className="banner">
                    <h1>Donor Registration</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} className="form-control"
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                           className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname" className="form-label">First name</label>
                    <input type="text" id="firstname" onChange={(e) => setfirstname(e.target.value)}
                           className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input type="text" id="lastname" onChange={(e) => setlastname(e.target.value)}
                           className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Number" className="form-label">Number</label>
                    <input type="text" id="Number" onChange={(e) => setnumber(e.target.value)} className="form-control"
                           required/>
                </div>
                <div className="form-group">
                    <Form.Label className="form-label">Gender</Form.Label>
                    <Form.Select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}
                                 className="form-control">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </div>
                <div className="form-group">
                    <Form.Label className="form-label">Governate</Form.Label>
                    <Form.Select id="governate" value={governate} onChange={(e) => setGovernate(e.target.value)}
                                 className="form-control">
                        <option value="">Choose a governate</option>
                        <option value="Cairo">Cairo</option>
                        <option value="Alexandria">Alexandria</option>
                        <option value="Al Dakahlia">Al Dakahlia</option>
                        <option value="Matrouh">Matrouh</option>
                    </Form.Select>
                </div>
                <div className="form-group">
                    <Form.Label className="form-label">Type of Donor</Form.Label>
                    <Form.Select id="user" value={user} onChange={(e) => setUser(e.target.value)}
                                 className="form-control">
                        <option value="">Select a donor type</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Teacher">Teacher</option>
                    </Form.Select>
                </div>
                <div className="form-group">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) => setaddress(e.target.value)}
                           className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="area" className="form-label">Area</label>
                    <input type="text" id="area" value={area} onChange={(e) => setarea(e.target.value)}
                           className="form-control" required/>
                </div>
                <div className="form-group file-upload">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input type="file" id="file" onChange={handleFileChange} className="form-control" required/>
                </div>
                <Button type="submit" className="submit-btn">Sign Up</Button>
                {error && <div className="error-message">{error}</div>}
                <p className="login-prompt">Already Registered? <span className="login-link"
                                                                      onClick={() => navigate("/Sign_in1")}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default SignUpFormDonor;