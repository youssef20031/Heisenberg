import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase.tsx";
import { ref } from "firebase/storage";
import { Form } from 'react-bootstrap';
import { Button } from "../components/ui/button.tsx";
import { uploadBytes } from "firebase/storage";
import '@/Designs/SignUpFormShared.css';



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
            <h1>You go registered now Login</h1>
            console.log("Account created");
            const options={
                method:'Post',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,firstname,lastname,password,gender,number,area,address,governate,user,Organization,verified})
            }
            const res= await fetch('https://se-project-951b4-default-rtdb.firebaseio.com/UserData.json' , options)
            console.log(res);

            if (file) {
                const storageRef = ref(storage, `${email}`);
                await uploadBytes(storageRef, file);
            }
            if(res){
                alert("You got registered now login");
              //   if (user === "Teacher") {
              //     navigate(`/teacherlogin/${email}`);
              // } else if (user === "Doctor") {
              //     navigate(`/doctorlogin/${email}`);
              // } else {
              //     navigate('/Sign_in1');
              // }
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
        <div className="dark-theme-wrapper">
          <form onSubmit={handleSubmit} className="dark-theme-form">
            <div className="dark-theme-banner">
              <h1>Sign Up</h1>
            </div>
            <div className="dark-theme-group">
              <label htmlFor="email" className="dark-theme-label">Email</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <label htmlFor="password" className="dark-theme-label">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <label htmlFor="firstname" className="dark-theme-label">First name</label>
              <input
                type="text"
                id="firstname"
                onChange={(e) => setfirstname(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <label htmlFor="lastname" className="dark-theme-label">Lastname</label>
              <input
                type="text"
                id="lastname"
                onChange={(e) => setlastname(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <label htmlFor="Number" className="dark-theme-label">Number</label>
              <input
                type="text"
                id="Number"
                onChange={(e) => setnumber(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <Form.Label htmlFor="gender" className="dark-theme-label">Gender</Form.Label>
              <Form.Select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="dark-theme-control"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </div>
            <div className="dark-theme-group">
              <Form.Label htmlFor="governate" className="dark-theme-label">Governate</Form.Label>
              <Form.Select
                id="governate"
                value={governate}
                onChange={(e) => setGovernate(e.target.value)}
                className="dark-theme-control"
              >
                <option value="">Choose a governate</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Al Dakahlia">Al Dakahlia</option>
                <option value="Matrouh">Matrouh</option>
              </Form.Select>
            </div>
            <div className="dark-theme-group">
              <Form.Label htmlFor="user" className="dark-theme-label">Type of Donor</Form.Label>
              <Form.Select
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="dark-theme-control"
              >
                <option value="">Select a donor type</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="regular donor">regular donor</option>
              </Form.Select>
            </div>
            <div className="dark-theme-group">
              <label htmlFor="address" className="dark-theme-label">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group">
              <label htmlFor="area" className="dark-theme-label">Area</label>
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setarea(e.target.value)}
                className="dark-theme-control"
                required
              />
            </div>
            <div className="dark-theme-group file-upload">
              <label htmlFor="file" className="dark-theme-label">Upload File:</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="dark-theme-control"
                required
              />
            </div>
            
            {/* <Button type="submit" className="dark-theme-submit">Sign Up</Button> */}
            <Button 
    type="submit" 
    className="dark-theme-submit" 
    onClick={() => {
        if (user === "Teacher") {
            navigate(`/teacherlogin/${email}`);
        } else if (user === "Doctor") {
            navigate(`/doctorlogin/${email}`);
        } else {
            navigate('/Sign_in1');
        }
    }}
>
    Sign Up
</Button>

            {error && <div className="dark-theme-error">{error}</div>}
            <p className="dark-theme-prompt">
              Already Registered?{' '}
              <span className="dark-theme-link" onClick={() => navigate('/Sign_in1')}>
                Login
              </span>
            </p>
          </form>
        </div>
      );
      
};

export default SignUpFormDonor;