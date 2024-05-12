import React, { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '@/firebase';
import { Button, Col, Form, InputGroup, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import medicalImage from './medical.jpg';
import { useNavigate } from "react-router-dom";
import "./View_Medical_Teaching.css";
import { getAuth, signOut } from "firebase/auth";
import Footer from "@/Donor/footer.tsx";
import HeaderBar from "@/Donor/Medical_Teaching_Navbar.tsx";


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(db, '/MedicaCase');
                const snapshot = await get(dbRef);
                alert("Warning: for Security Reasons, you have to log out after donating");
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

    useEffect(() => {
        if (data) {
            if (Governate !== '' || search !== '') {
                const filtered = Object.values(data).filter(item => {
                    const GovernateMatch = Governate === '' || item.Governate === Governate;
                    const searchMatch = search === '' || item.Location.toLowerCase().includes(search.toLowerCase()) || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase()) || item.MedicalSpeciality.toLowerCase().includes(search.toLowerCase());
                    return GovernateMatch && searchMatch;
                });
                setFilteredData(filtered);
            } else {
                setFilteredData(Object.values(data));
            }
        }
    }, [Governate, search, data]);
    const handleLogout = () => {
        navigate('/');

    };
    return (
        <div>
            <HeaderBar/>
        <div className="View_Medical" style={{ marginTop: '50px', marginBottom: '50px' }}>

            <h2 style={{ marginBottom: '30px',color:'Black' }}>Realtime Database Data:</h2>
            <div className="g-1" style={{backgroundColor: '#0044cc'}}>

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
            </div>

            {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: View_Medical, index: number) => (
                    <div key={index}>
                        <Card className="carousel" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={medicalImage} />
                            <Card.Body>
                                <Card.Title>{item.CaseNum}</Card.Title>
                                <Card.Text>
                                    Name: {item.Name} <br />
                                    Age: {item.Age} <br />
                                    Gender: {item.Gender} <br />
                                    Case: {item.Case} <br />
                                    Case Description: {item.CaseDescription} <br />
                                    Medical Speciality: {item.MedicalSpeciality} <br />
                                    Weight: {item.Weight} <br />
                                    OrgName: {item.OrgName} <br />
                                    Location: {item.Location} <br />
                                    Governate: {item.Governate} <br />
                                    Area: {item.Area} <br />
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleViewloc(item.CaseNum)}>Location</Button>
                                <Button variant="primary" onClick={() => handleFulfill(item.CaseNum)}>Fulfill</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <div style={{ marginBottom: '30px',color:'Black' }}>No data available</div>
            )}

        </div>
            <Footer/>
        </div>
    );
}

export default View_Medical;