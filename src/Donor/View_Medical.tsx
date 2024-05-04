import React, { useEffect, useState } from 'react';
import { ref, get, remove,update } from 'firebase/database';
import { db,storage } from '@/firebase';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL,deleteObject} from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
// eslint-disable-next-line react-hooks/rules-of-hooks



interface View_Medical {
    name: string;
    email: string;
    CaseNum: string;
    Case: string;
}



const View_Medical: React.FC = () => {
    const [data, setData] = useState<Record<string, View_Medical> | null>(null);
    const [search, setSearch]=useState('');
    const navigate = useNavigate();

    const handleViewloc = async (CaseNum: string) => {
        navigate(`/locationMapsetter/${CaseNum}`);
    }

    const handleFulfill = async (caseNum: string) => {
        try {
            const dbRef = ref(db, '/MedicaCase');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].CaseNum === caseNum);

                if (userId) {
                    // Update the verification column to true
                    await update(ref(db, `MedicaCase/${userId}`), { Case: "True" });
                    setData((prevData: any) => {
                        const newData = { ...prevData };
                        newData[userId].Case = "True";
                        return newData;
                    });
                } else {
                    console.log('No user found with caseNu,:', caseNum);
                }
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(db, '/MedicaCase');
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    setData(snapshot.val());
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <h2 className="text-center" style={{ marginBottom: '30px' }}>Realtime Database Data:</h2>
            {data && Object.keys(data).length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr style={{marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px'}}>
                        <th style={{width: '10%'}}>Case Number</th>
                        <th style={{width: '10%'}}>Name</th>
                        <th style={{width: '10%'}}>Age</th>
                        <th style={{width: '10%'}}>Gender</th>
                        <th>Location</th>
                        <th>Weight</th>
                        <th>Organization name</th>
                        <th>Medical Speciality</th>
                        <th>Case Description</th>
                        <th>Location</th>
                        <th>Control Center</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map((item: any, index: number) => (
                        <tr key={index}>
                            <td style={{width: '15%'}}>{item.CaseNum}</td>
                            <td style={{width: '15%'}}>{item.Name}</td>
                            <td style={{width: '10%'}}>{item.Age}</td>
                            <td style={{width: '10%'}}>{item.Gender}</td>
                            <td style={{width: '10%'}}>{item.Location}</td>
                            <td style={{width: '10%'}}>{item.Weight}</td>
                            <td style={{width: '15%'}}>{item.OrgName}</td>
                            <td style={{width: '15%'}}>{item.MedicalSpeciality}</td>
                            <td style={{width: '15%'}}>{item.CaseDescription}</td>
                            <td style={{width: '15%'}}>
                                <Button variant="primary" onClick={() => handleViewloc(item.CaseNum)}>Location</Button>
                            </td>
                            <td style={{width: '15%'}}>
                                <Button variant="primary" onClick={() => handleFulfill(item.CaseNum)}>Fulfill</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center" style={{ marginTop: '50px', marginBottom: '50px' }}>No records found.</p>
            )}
        </div>
    );
}

export default View_Medical;