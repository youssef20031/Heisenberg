import HeaderBar from "@/Donor/HeaderBar.tsx";

``
import React, { useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '@/firebase';
import {Button, Alert, Row} from 'react-bootstrap';
import Footer from "@/Donor/footer";

const PasswordModification: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = async () => {
        try {
            const dbRef = ref(db);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userExists = Object.values(userData).find((user: any) => user.username === "mero");

                if (userExists) {
                    await update(ref(db, `/Admin`), { password: newPassword });
                    setSuccess(true);
                    setError('');
                } else {
                    setError("User 'mero' not found");
                }
            } else {
                setError("No data available");
            }
        } catch (error) {
            setError("Error updating password: " + error);
        }
    }
    
    return (
        <div>

            <HeaderBar/>
            <div style={{textAlign: 'center'}}>
                <h2>Password modification</h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh'}}>
            <Row>
                <label htmlFor="newPassword">
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="inputfields"
                        required
                    />
                </label>
                <Button onClick={handleChange}>Submit</Button>
            </Row>
                    {error && <Alert variant="danger" style={{textAlign: "right", color: "red" }}>{error}</Alert>}
                {success && <Alert variant="success" style={{textIndent: "40px", marginTop: "10px", color: "green", background: "none", border: "none" }}>Password changed successfully</Alert>}
            </div>
            <Footer/>
        </div>
    );
}

export default PasswordModification;
