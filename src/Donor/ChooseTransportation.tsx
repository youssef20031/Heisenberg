import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '@/firebase';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ChooseTransportation.css';
import {useNavigate} from "react-router-dom"; // Assuming you have a CSS file for custom styles

const ChooseTransportation: React.FC = () => {
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Assuming you have a specific path where you want to store transportation choices
        const transportationRef = ref(db, 'TransportationForDonation/' + new Date().getTime());
        set(transportationRef, {
            Type: type,
            Date: date,
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
            navigate('/home1');
        }).catch((error) => {
            // Handle error scenario
            console.error('Error saving data: ', error);
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit} className="transportation-form">
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Transportation Type</Form.Label>
                            <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)} className="mb-3">
                                <option value="">Select Type</option>
                                <option value="Truck">Truck</option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="Car">Car</option>
                                {/* Add more options as needed */}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChooseTransportation;