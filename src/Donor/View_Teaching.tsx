import React, { useEffect, useState } from 'react';
import { ref, get, remove,update } from 'firebase/database';
import { db,storage } from '@/firebase';
import {Button, Col, Form, InputGroup, Row, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, deleteUser, User } from "firebase/auth";
import { getDownloadURL,deleteObject} from 'firebase/storage';
import { ref as Ref2 } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import "./View_Medical_Teaching.css";



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
                        placeholder="search Organization names or Area or Location"
                    />
                </InputGroup>
            </Form>
            </div>
            <div className="g-1">
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
            <div className="g-2">
                <Button className="Button" onClick={handleButton}>Submit</Button>
            </div>
            {data && Object.keys(data).length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr style={{marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px'}}>
                        <th>TeachingNum</th>
                        <th>Number Of Students</th>
                        <th>Location</th>
                        <th>Subjects</th>
                        <th>Fulfilled</th>
                        <th>Organization Name</th>
                        <th>Area</th>
                        <th>Governate</th>
                        <th>Control Center</th>
                        <th>Fulfill</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isClicked ? (
                        filteredData.map((item: View_Teaching, index: number) => (
                                <tr key={index}>
                                    <td style={{width: '15%'}}>{item.TeachingNum}</td>
                                    <td style={{width: '15%'}}>{item.NumOfStudents}</td>
                                    <td style={{width: '10%'}}>{item.Location}</td>
                                    <td style={{width: '10%'}}>{item.Subjects}</td>
                                    <td style={{width: '10%'}}>{item.Fulfilled}</td>
                                    <td style={{width: '10%'}}>{item.OrgName}</td>
                                    <td style={{width: '10%'}}>{item.Area}</td>
                                    <td style={{width: '15%'}}>{item.Governate}</td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleViewloc(item.TeachingNum)}>Location</Button>
                                    </td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleFulfill(item.TeachingNum)}>Fulfill</Button>
                                    </td>
                                </tr>
                            )
                        )
                    ) : (

                        Object.values(data).map((item: View_Teaching, index: number) => (
                                <tr key={index}>
                                    <td style={{width: '15%'}}>{item.TeachingNum}</td>
                                    <td style={{width: '15%'}}>{item.NumOfStudents}</td>
                                    <td style={{width: '10%'}}>{item.Location}</td>
                                    <td style={{width: '10%'}}>{item.Subjects}</td>
                                    <td style={{width: '10%'}}>{item.Fulfilled}</td>
                                    <td style={{width: '10%'}}>{item.OrgName}</td>
                                    <td style={{width: '10%'}}>{item.Area}</td>
                                    <td style={{width: '15%'}}>{item.Governate}</td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleViewloc(item.TeachingNum)}>Location</Button>
                                    </td>
                                    <td style={{width: '15%'}}>
                                        <Button variant="primary"
                                                onClick={() => handleFulfill(item.TeachingNum)}>Fulfill</Button>
                                    </td>
                                </tr>
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

export default View_Teaching;