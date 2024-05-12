import React, { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '@/firebase';
import { Button, Col, Form, InputGroup, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import "./View_Medical_Teaching.css";
import teaching from "./teaching.jpg";
import Footer from './footer';
import HeaderBar from './HeaderBar';



interface View_Teaching {
    TeachingNum: string;
    NumOfStudents: string;
    Location: string;
    Subjects: string;
    Fulfilled: string;
    OrgName: string;
    Area: string;
    Governate: string;
}



const View_Teaching: React.FC = () => {
    const [data, setData] = useState<Record<string, View_Teaching> | null>(null);
    const navigate = useNavigate();
    const [searchSpeciality, setSpecialityChange] = useState('');
    const [Governate, setGovernateChange] = useState('');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<View_Teaching[]>([]);
    const [ search, setSearch] = useState('');

    const handleViewloc = async (TeachingNum: string) => {
        navigate(`/locationMapsetter3/${TeachingNum}`);
    }

    const handleFulfill = async (teachingNum: string) => {
        try {
            const dbRef = ref(db, '/TeachingPosts');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userId = Object.keys(userData).find(key => userData[key].TeachingNum === teachingNum);

                if (userId) {
                    // Update the verification column to true
                    await update(ref(db, `TeachingPosts/${userId}`), { Fulfilled: "True" });
                    setData((prevData: any) => {
                        const newData = { ...prevData };
                        newData[userId].Fulfilled = "True";
                        return newData;
                    });
                    alert('Record has been fulfilled');
                } else {
                    console.log('No user found with caseNu,:', teachingNum);
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
                const specialityMatch = Governate === '' || item.Governate === Governate;
                const searchMatch = search === '' || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Location.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase());
                return specialityMatch && searchMatch;
            });
            setFilteredData(filtered);
        } else {
            const filtered = Object.values(data!).filter(item => search === '' || item.Location.toLowerCase().includes(search.toLowerCase()) || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase()));
            setFilteredData(filtered);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(db, '/TeachingPosts');
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
                    const searchMatch = search === '' || item.Location.toLowerCase().includes(search.toLowerCase()) || item.OrgName.toLowerCase().includes(search.toLowerCase()) || item.Area.toLowerCase().includes(search.toLowerCase());
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
        <div className="View_Teaching" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <h2 className="text-center" style={{ marginBottom: '30px' }}>Realtime Database Data:</h2>
            <div className="g-1" style={{backgroundColor: '#0044cc'}}>
                <Form>
                    <InputGroup>
                        <Form.Control
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="search Organization names or Area or Location"
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
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
            {filteredData && filteredData.length > 0 ? (
                filteredData.map((item: View_Teaching, index: number) => (
                    <div key={index}>
                        <Card className="carousel" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Img variant="top" src={teaching} />
                                <Card.Title>{item.TeachingNum}</Card.Title>
                                <Card.Text>
                                    Number Of Students: {item.NumOfStudents} <br />
                                    Location: {item.Location} <br />
                                    Subjects: {item.Subjects} <br />
                                    Fulfilled: {item.Fulfilled} <br />
                                    Organization Name: {item.OrgName} <br />
                                    Area: {item.Area} <br />
                                    Governate: {item.Governate} <br />
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleViewloc(item.TeachingNum)}>Location</Button>
                                <Button variant="primary" onClick={() => handleFulfill(item.TeachingNum)}>Fulfill</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <div className="text-center">No data available</div>
            )}
        </div>
            <Footer/>
        </div>
    );
}

export default View_Teaching;