import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

const BookHotel = () => {
    const location = useLocation();
    const { hotelId, hotelKey, recommendationId, rateplanId, hotelSearchDetails, searchKey } = location.state || {};

    let occupantCounter = 1;
    let adultCounter = 1;
    let childCounter = 1;
    const navigate = useNavigate();

    const initialOccupantDetails = hotelSearchDetails.HotelRoomDetail
        ? hotelSearchDetails.HotelRoomDetail.flatMap((room, roomIndex) => {
            return [
                ...Array.from({ length: room.AdultCount }, () => ({
                    OccupantID: occupantCounter++,
                    FirstName: "",
                    LastName: "",
                    OccupantType: `Adult ${adultCounter++}`,
                    Title: "Mr",
                    RoomNo: roomIndex + 1,
                })),
                ...Array.from({ length: room.ChildCount }, () => ({
                    OccupantID: occupantCounter++,
                    FirstName: "",
                    LastName: "",
                    OccupantType: `Child ${childCounter++}`,
                    Title: "Mr",
                    RoomNo: roomIndex + 1,
                }))
            ];
        })
        : [];

    const [formData, setFormData] = useState({
        OccupantEmail: "",
        OccupantMobile: "",
        CustomerAddress: "",
        CustomerName: "",
        CustomerPostalCode: "",
        OccupantDetails: initialOccupantDetails,
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle occupant details change
    const handleOccupantChange = (index, field, value) => {
        const updatedOccupants = formData.OccupantDetails.map((occupant, i) =>
            i === index ? { ...occupant, [field]: value } : occupant
        );
        setFormData({ ...formData, OccupantDetails: updatedOccupants });
    };

    const callBook = async () => {
        try {
            const response = await fetch('/api/bookhotel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerDetails: formData,
                    hotelId,
                    hotelKey,
                    recommendationId,
                    rateplanId,
                    hotelSearchDetails,
                    searchKey
                }),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        callBook();
    };

    return (
        <Container className="mt-4">
            <Button onClick={() => navigate(-1)} variant="outline-primary" className="mb-4">
                <ArrowLeft size={18} className="me-2" /> Back
            </Button>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="CustomerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerName"
                                value={formData.CustomerName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="OccupantEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="OccupantEmail"
                                value={formData.OccupantEmail}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="CustomerAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerAddress"
                                value={formData.CustomerAddress}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="OccupantMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="tel"
                                name="OccupantMobile"
                                value={formData.OccupantMobile}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-3">
                        <Form.Group controlId="CustomerPostalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="CustomerPostalCode"
                                value={formData.CustomerPostalCode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <h4>Occupant Details</h4>
                {formData.OccupantDetails.map((occupant, index) => (
                    <div key={occupant.OccupantID} className="mb-3">
                        <h5>Occupant {index + 1} ({occupant.OccupantType})</h5>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId={`Title-${index}`}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Select
                                        value={occupant.Title}
                                        onChange={(e) => handleOccupantChange(index, 'Title', e.target.value)}
                                        required
                                    >
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Miss">Miss</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`FirstName-${index}`}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={occupant.FirstName}
                                        onChange={(e) => handleOccupantChange(index, 'FirstName', e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId={`LastName-${index}`}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={occupant.LastName}
                                        onChange={(e) => handleOccupantChange(index, 'LastName', e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                ))}

                <Button type="submit" variant="primary">Book Now</Button>
            </Form>
        </Container>
    );
};

export default BookHotel;
