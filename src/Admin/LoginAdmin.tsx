import React, { useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../firebase.tsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginAdmin.css';
import { Button, Form, Container, Alert } from 'react-bootstrap';


const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidCredentials, setIsValidCredentials] = useState<boolean | null>(null);

  const checkCredentials = async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userExists = Object.values(userData).some((user: any) =>{
          return user.username === username && user.password === password;
        });
        setIsValidCredentials(userExists);
        if (userExists) {
          navigate("/dashboard1");
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await checkCredentials();
  };

  return (
      <div className="dark-theme-wrapper">

          <Form onSubmit={handleSubmit} className="dark-theme-form">
            <div className="dark-theme-banner">
              <h1>Sign In</h1>
            </div>
            <Form.Group style={{color:"white"}} className="mb-3" controlId="username">
              <Form.Label>Enter Username:</Form.Label>
              <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
              />
            </Form.Group>

            <Form.Group style={{color:"white"}} className="mb-3" controlId="password">
              <Form.Label>Enter Password:</Form.Label>
              <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

          {isValidCredentials !== null && (
              <Alert variant={isValidCredentials ? "success" : "danger"} className="mt-3 w-50 mx-auto">
                {isValidCredentials ? "Username and password are correct" : "Username or password is incorrect"}
              </Alert>
          )}
      </div>


  );
};

export default LoginAdmin;