import React, { useEffect, useState } from 'react';
import { ref, get, remove,update } from 'firebase/database';
import { db,storage } from '@/firebase';
import {Button, Col, Form, InputGroup, Row, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL,deleteObject} from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';
import {useNavigate} from "react-router-dom";
import "./View_Medical_Teaching.css";
// eslint-disable-next-line react-hooks/rules-of-hooks



interface View_Medical {
    Name: string;
    Age: string;
    email: string;
    Gender: string;
    CaseNum: string;
    Case: string;
    OrgName: string;
    Location: string;
    MedicalSpeciality: string;
    Weight: string;
    CaseDescription: string;
    Governate: string;
    Area: string;
}



const View_Medical: React.FC = () => {
    const [data, setData] = useState<Record<string, View_Medical> | null>(null);
    const navigate = useNavigate();
    const [searchSpeciality, setSpecialityChange] = useState('');
    const [Governate, setGovernateChange] = useState('');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<View_Medical[]>([]);
    const [ search, setSearch] = useState('');

    const handleViewloc = async (CaseNum: string) => {
        navigate(`/locationMapsetter2/${CaseNum}`);
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
                    alert('Record has been fulfilled');
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

    const handleSpecialityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGovernateChange(event.target.value);
    };

    const handleButton = () => {
        setIsClicked(true);
        if (Governate !== '') {
            const filtered = Object.values(data!).filter(item => {
                const GovernateMatch = Governate === '' || item.Governate === Governate;
                const searchMatch = search === '' || item.Location.toLowerCase().includes(search.toLowerCase()) || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase()) || item.MedicalSpeciality.toLowerCase().includes(search.toLowerCase());
                return GovernateMatch && searchMatch;
            });
            setFilteredData(filtered);
        } else {
            const filtered = Object.values(data!).filter(item => search === '' ||
                item.Location.toLowerCase().includes(search.toLowerCase()) || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase()) || item.MedicalSpeciality.toLowerCase().includes(search.toLowerCase()));
            setFilteredData(filtered);
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
        <div className="View_Medical" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <h2 className="text-center" style={{ marginBottom: '30px' }}>Realtime Database Data:</h2>
            <div className="g-1">
            <Form>
                <InputGroup>
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search Organization names or Area or Location or Medical Speciality"
                    />
                </InputGroup>
            </Form>
            <Row>
                <Col md>
                    <Form>
                        <Form.Select onChange={handleSpecialityChange} value={Governate}>
                            <option value="">Select Governate</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Alexandria">Alexandria</option>
                            <option value="Al Dakahlia">Al Dakahlia</option>
                            <option value="Matrouh">Matrouh</option>

                        </Form.Select>
                    </Form>
                </Col>
            </Row>
                <Button className="Button" onClick={handleButton}>Submit</Button>
            </div>

            {data && Object.keys(data).length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr style={{marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px'}}>
                        <th style={{width: '10%'}}>Case Number</th>
                        <th style={{width: '10%'}}>Name</th>
                        <th style={{width: '10%'}}>Age</th>
                        <th style={{width: '10%'}}>Gender</th>
                        <th>Governate</th>
                        <th>Location</th>
                        <th>Area</th>
                        <th>Weight</th>
                        <th>Organization name</th>
                        <th>Medical Speciality</th>
                        <th>Case Description</th>
                        <th>Control Center</th>
                        <th>Fulfill</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isClicked ? (
                        filteredData.map((item: View_Medical, index: number) => (
                            item.Case !== "True" && (
                                <tr key={index}>
                                    <td style={{width: '15%'}}>{item.CaseNum}</td>
                                    <td style={{width: '15%'}}>{item.Name}</td>
                                    <td style={{width: '10%'}}>{item.Age}</td>
                                    <td style={{width: '10%'}}>{item.Gender}</td>
                                    <td style={{width: '10%'}}>{item.Governate}</td>
                                    <td style={{width: '10%'}}>{item.Location}</td>
                                    <td style={{width: '10%'}}>{item.Area}</td>
                                    <td style={{width: '10%'}}>{item.Weight}</td>
                                    <td style={{width: '15%'}}>{item.OrgName}</td>
                                    <td style={{width: '15%'}}>{item.MedicalSpeciality}</td>
                                    <td style={{width: '15%'}}>{item.CaseDescription}</td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleViewloc(item.CaseNum)}>Location</Button>
                                    </td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleFulfill(item.CaseNum)}>Fulfill</Button>
                                    </td>
                                </tr>
                            )
                            )
                        )
                    ) : (

                        Object.values(data).map((item: View_Medical, index: number) => (
                            item.Case !== "True" && (
                            <tr key={index}>
                                    <td style={{width: '15%'}}>{item.CaseNum}</td>
                                    <td style={{width: '15%'}}>{item.Name}</td>
                                    <td style={{width: '10%'}}>{item.Age}</td>
                                    <td style={{width: '10%'}}>{item.Gender}</td>
                                    <td style={{width: '10%'}}>{item.Governate}</td>
                                    <td style={{width: '10%'}}>{item.Location}</td>
                                    <td style={{width: '10%'}}>{item.Area}</td>
                                    <td style={{width: '10%'}}>{item.Weight}</td>
                                    <td style={{width: '15%'}}>{item.OrgName}</td>
                                    <td style={{width: '15%'}}>{item.MedicalSpeciality}</td>
                                    <td style={{width: '15%'}}>{item.CaseDescription}</td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleViewloc(item.CaseNum)}>Location</Button>
                                    </td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleFulfill(item.CaseNum)}>Fulfill</Button>
                                    </td>
                                </tr>
                            )
                            )
                        )
                    )}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center" style={{marginTop: '50px', marginBottom: '50px'}}>No records found.</p>
            )}
        </div>
    );
}

export default View_Medical;