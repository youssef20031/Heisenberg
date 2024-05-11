
import React, { useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '@/firebase';
import { Button, Alert } from 'react-bootstrap';
import './passwordmodif.css';

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
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Password changed successfully</Alert>}
        </div>
    );
}

export default PasswordModification;
