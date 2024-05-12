import React, { useEffect, useState } from 'react';
import { ref, get, remove, update } from 'firebase/database';
import { db, storage } from '@/firebase';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Donorlist.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';
import HeaderBar from "@/Donor/HeaderBar.tsx";
import Footer from "@/Donor/footer.tsx";

interface OrganizationData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    gender: string;
    area: string;
    number: string;
    governate: string;
    verification: string;
    organizationname: string;
    organizationtype: string;
}

const NotRegisteredOrg: React.FC = () => {
    const [data, setData] = useState<Record<string, OrganizationData> | null>(null);

    const handleView = async (email: string) => {
        try {
            const pdf = Ref2(storage, `${email}`);
            const pdfurl = await getDownloadURL(pdf);
            window.open(pdfurl, '_blank');
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    const handleAccept = async (email: string) => {
        try {
            const dbRef = ref(db, '/OrganizationData');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].email === email);

                if (userId) {
                    // Update the verification column to true
                    await update(ref(db, `OrganizationData/${userId}`), { verification: "True" });
                    setData((prevData: any) => {
                        const newData = { ...prevData };
                        newData[userId].verification = "True";
                        return newData;
                    });
                } else {
                    console.log('No user found with email:', email);
                }
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    };

    const handleReject = async (email: string) => {
        try {
            const dbRef = ref(db, '/OrganizationData');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].email === email);

                if (userId) {
                    await remove(ref(db, `OrganizationData/${userId}`));
                    const fileRef = Ref2(storage, `${email}`);
                    await deleteObject(fileRef);
                    setData((prevData: any) => {
                        const newData = { ...prevData };
                        delete newData[userId];
                        return newData;
                    });

                    const auth = getAuth();
                    const currentUser: User | null = auth.currentUser;

                    if (currentUser) {
                        await deleteUser(currentUser);
                    } else {
                        console.log('No user currently authenticated.');
                    }
                } else {
                    console.log('No user found with email:', email);
                }
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(db, '/OrganizationData');
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
        <div style={{ marginTop: '50px', marginBottom: '50px',backgroundColor:'#f0f0f0' }}>
            <HeaderBar/>
            <h2 className="text-center" style={{ marginBottom: '30px' }}>Realtime Database Data:</h2>
            {data && Object.keys(data).length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px' }}>
                        <th style={{ width: '10%' }}>Email</th>
                        <th style={{ width: '10%' }}>Password</th>
                        <th style={{ width: '10%' }}>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>gender</th>
                        <th>Area</th>
                        <th>Number</th>
                        <th>Governate</th>
                        <th>Verified</th>
                        <th>Organization Name</th>
                        <th>Organization Type</th>
                        <th>Control Center</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map((item: OrganizationData, index: number) => (
                        // Check if the organization is not verified
                        item.verification === "False" && (
                            <tr key={index}>
                                <td style={{ width: '15%' }}>{item.email}</td>
                                <td style={{ width: '15%' }}>{item.password}</td>
                                <td style={{ width: '10%' }}>{item.firstname}</td>
                                <td style={{ width: '10%' }}>{item.lastname}</td>
                                <td style={{ width: '10%' }}>{item.address}</td>
                                <td>{item.gender}</td>
                                <td style={{ width: '10%' }}>{item.area}</td>
                                <td style={{ width: '10%' }}>{item.number}</td>
                                <td style={{ width: '10%' }}>{item.governate}</td>
                                <td style={{ width: '15%' }}>{item.verification}</td>
                                <td style={{ width: '15%' }}>{item.organizationname}</td>
                                <td style={{ width: '15%' }}>{item.organizationtype}</td>
                                <td style={{ display: 'flex', gap: '8px' }}>
                                    <Button variant="danger" id="rejectbutton" onClick={() => handleReject(item.email)}>Reject</Button>
                                    <Button variant="success" id="acceptbutton" onClick={() => handleAccept(item.email)}>Accept</Button>
                                    <Button onClick={() => handleView(item.email)}>View Organization document</Button>
                                </td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center" style={{ marginTop: '50px', marginBottom: '50px' }}>No records found.</p>
            )}
            <Footer/>
        </div>
    );
};

export default NotRegisteredOrg;
