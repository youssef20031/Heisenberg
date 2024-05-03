import React, { useEffect, useState } from 'react';
import { ref, get, remove, update } from 'firebase/database';
import { db, storage } from '@/firebase';
import { Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';


const DonorList: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedGovernate, setSelectedGovernate] = useState<any>('');

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
      const dbRef = ref(db, '/UserData');
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData).find(key => userData[key].email === email);

        if (userId) {
          await update(ref(db, `UserData/${userId}`), { verified: "True" });
          setData((prevData: any) => {
            const newData = { ...prevData };
            newData[userId].verified = "True";
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
      const dbRef = ref(db, '/UserData');
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData).find(key => userData[key].email === email);

        if (userId) {
          await remove(ref(db, `UserData/${userId}`));
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
        const dbRef = ref(db, '/UserData');
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

  const handleGovernateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernate(event.target.value);
  };

  return (
      <div>
        <h2>Realtime Database Data:</h2>
        <Form>
          <Form.Select onChange={handleGovernateChange} value={selectedGovernate}>
            <option value="">Select Governate</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Al Dakahlia">Al Dakahlia</option>
            <option value="Matrouh">Matrouh</option>
            {/* Add more options as needed */}
          </Form.Select>
        </Form>
        {data && Object.keys(data).length > 0 ? (
            <Table striped bordered hover>
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
                <th>Organization</th>
                <th>User</th>
                <th>Verification</th>
                <th>Control Center</th>
              </tr>
              </thead>
              <tbody>
              {Object.values(data).map((item: any, index: number) => (
                  item.governate === selectedGovernate && (
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
                        <td style={{ width: '10%' }}>{item.Organization}</td>
                        <td style={{ width: '10%' }}>{item.user}</td>
                        <td style={{ width: '10%' }}>{item.verified}</td>
                        <td style={{ display: 'flex', gap: '8px' }}>
                          <Button variant="danger" id="rejectbutton" onClick={() => handleReject(item.email)}>Reject</Button>
                          <Button variant="success" id="acceptbutton" onClick={() => handleAccept(item.email)}>Accept</Button>
                          <Button onClick={() => handleView(item.email)}>View donor submission</Button>
                        </td>
                      </tr>
                  )
              ))}
              </tbody>
            </Table>
        ) : (
            <p>No records found.</p>
        )}
      </div>
  );
};

export default DonorList;
