import React, { useEffect, useState } from 'react';
import { ref, get, remove, update } from 'firebase/database';
import { db, storage } from '@/firebase';
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';
import {useNavigate} from "react-router-dom";
import './OrganizationList.css';

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

const OrganizationList: React.FC = () => {
  const [data, setData] = useState<Record<string, OrganizationData> | null>(null);
  const [ search, setSearch] = useState('');
  const [selectedGovernate, setSelectedGovernate] = useState<string>('');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<OrganizationData[]>([]);
  const [Organizationtype,setOrganizationtype] = useState('');
  const navigate=useNavigate();

  const handleView = async (email: string) => {
    try {
      const pdf = Ref2(storage, `${email}`);
      const pdfurl = await getDownloadURL(pdf);
      window.open(pdfurl, '_blank');
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleViewloc = async (email: string) => {
      navigate(`/locationMapsetter/${email}`);
  }

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

  const handleGovernateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernate(event.target.value);
  };

  const handleOrganizationtype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganizationtype(event.target.value);
  };

  const handleButton = () => {
    setIsClicked(true);
    if (selectedGovernate !== '' || Organizationtype !== '') {
      const filtered = Object.values(data!).filter(item => {
        const governateMatch = selectedGovernate === '' || item.governate === selectedGovernate;
        const organizationTypeMatch = Organizationtype === '' || item.organizationtype === Organizationtype;
        const searchMatch = search === '' || item.organizationname.toLowerCase().includes(search.toLowerCase());
        return governateMatch && organizationTypeMatch && searchMatch;
      });
      setFilteredData(filtered);
    } else {
      const filtered = Object.values(data!).filter(item => search === '' || item.organizationname.toLowerCase().includes(search.toLowerCase()));
      setFilteredData(filtered);
    }
  };




  return (
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        <h2 className="text-center" style={{ margin: '30px' }}>Realtime Database Data:</h2>

        <Form>
          <InputGroup>
            <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search Organization names"
            />
          </InputGroup>
        </Form>

        <Row className="g-2">
          <Col md>
            <Form>
              <Form.Select onChange={handleGovernateChange} value={selectedGovernate}>
                <option value="">Select Governate</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Al Dakahlia">Al Dakahlia</option>
                <option value="Matrouh">Matrouh</option>

              </Form.Select>
            </Form>
          </Col>

          <Col md>
            <Form>
              <Form.Select onChange={handleOrganizationtype} value={Organizationtype}>
                <option value="">Select Governate</option>
                <option value="Hospital">Hospital</option>
                <option value="Orgpahanage">Orphanage</option>
                <option value="School">School</option>
                <option value="Refugees">Refugee and people in need</option>

              </Form.Select>
            </Form>
          </Col>

        </Row>

        <Button onClick={handleButton}>Submit</Button>

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

              {isClicked ? (
                  filteredData.map((item: OrganizationData, index: number) => (
                      item.verification === "True" && (
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
                          <Button variant="danger" id="rejectbutton" onClick={() => handleReject(item.email)}>Remove Account</Button>
                          <Button onClick={() => handleView(item.email)}>View Organization document</Button>
                          <Button onClick={() => handleViewloc(item.email)}>View Location</Button>
                        </td>
                      </tr>
                      )
                  ))
              ) : (

                  Object.values(data).map((item: OrganizationData, index: number) => (
                      item.verification === "True" && (
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
                          <Button variant="danger" id="rejectbutton" onClick={() => handleReject(item.email)}>Remove</Button>
                          <Button onClick={() => handleView(item.email)}>View Organization document</Button>
                          <Button onClick={() => handleViewloc(item.email)}>View Location</Button>
                        </td>
                      </tr>
                    )
                  ))
              )}
              </tbody>
            </Table>
        ) : (
            <p className="text-center" style={{ marginTop: '50px', marginBottom: '50px' }}>No records found.</p>
        )}
      </div>
  );
};

export default OrganizationList;
