import React, { useState } from 'react';
import { Table, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaUser, FaUserShield } from 'react-icons/fa';
import axios from 'axios';

const UserSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users`, { params: { name: searchTerm } });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    };

    // Function to switch user type
    const handleSwitchUserType = async (clientId) => {
        try {
            const response = await axios.put(`/api/users/switch-type/${clientId}`);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.clientId === clientId ? { ...user, userType: response.data.userType } : user
                )
            );
        } catch (error) {
            console.error("Error switching user type:", error);
        }
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col md={8} className="mx-auto">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col md={10} className="w-100">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div style={{ height: '400px', overflowY: 'scroll' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Client ID</th>
                                        <th>Name</th>
                                        <th>User Role</th>
                                        <th>Mobile Number</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th>State</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.clientId}>
                                                <td>{user.clientId}</td>
                                                <td>{user.name}</td>
                                                <td>{user.userType === 0 ? 'Admin' : 'User'}</td>
                                                <td>{user.mobileNumber}</td>
                                                <td>{user.email}</td>
                                                <td>{user.gender}</td>
                                                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                                <td>{user.state}</td>
                                                <td>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleSwitchUserType(user.clientId)}
                                                        style={{ padding: '5px 10px' }}
                                                    >
                                                        {user.userType === 0 ? (
                                                            <>
                                                                <FaUserShield style={{ marginRight: '5px' }} /> Switch to Admin
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaUser style={{ marginRight: '5px' }} /> Switch to User
                                                            </>
                                                        )}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserSearchPage;
