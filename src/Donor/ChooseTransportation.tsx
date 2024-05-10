import React, {useEffect, useState} from 'react';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ChooseTransportation.css';
import {useNavigate, useParams} from "react-router-dom"; // Assuming you have a CSS file for custom styles
import styled from 'styled-components';

const StyledSelect = styled.select`
    color: white;
    background-color: #353535;

    option:checked {
        color: white;
    }

    option:not(:checked) {
        color: black;
        background-color: white;
    }
`;
const ChooseTransportation: React.FC = () => {
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const { email } = useParams<{ email: string }>();
    const [today, setToday] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Assuming you have a specific path where you want to store transportation choices
        const transportationRef = ref(db, 'TransportationForDonation/' + new Date().getTime());
        set(transportationRef, {
            Type: type,
            Date: date,
            DonorEmail: email,
        }).then(() => {
            // Handle success scenario (e.g., showing a success message or redirecting)

            const currentDate = new Date();
            const chosenDate = new Date(date);
            const timeDiff = chosenDate.getTime() - currentDate.getTime();

            // Convert time difference from milliseconds to days
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            let etaMessage;
            if (daysDiff > 0) {
                etaMessage = `Your estimated time of arrival is in ${daysDiff} day(s).`;
            } else if (daysDiff === 0) {
                etaMessage = "Your estimated time of arrival is today.";
            } else {
                etaMessage = "The chosen date is in the past.";
            }

            alert(etaMessage);
            console.log('Data saved successfully!');
            navigate(`/Home1/${email}`);
        }).catch((error) => {
            // Handle error scenario
            console.error('Error saving data: ', error);
        });
    };
    useEffect(() => {
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
        const day = String(todayDate.getDate()).padStart(2, '0');
        setToday(`${year}-${month}-${day}`);
    }, []);
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{span: 6, offset: -5}}>
                    <div>
                        <Form onSubmit={handleSubmit} className="transportation-form">
                            <Form.Group controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    min={today}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mb-3"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formType">
                                <Form.Label>Transportation Type</Form.Label>
                                <StyledSelect as="select" value={type} onChange={(e) => setType(e.target.value)}
                                              className="mb-3" required>
                                    <option value="">Select Type</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Car">Car</option>
                                    {/* Add more options as needed */}
                                </StyledSelect>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChooseTransportation;