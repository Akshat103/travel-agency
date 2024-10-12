import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Container, Form } from 'react-bootstrap';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 15;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/orders/get?page=${page}&limit=${limit}`);
                setOrders(response.data.data || []);
                setTotalPages(Math.ceil(response.data.totalOrders / limit));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [page]);

    useEffect(() => {
        const fetchFilteredOrders = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(`/api/orders/search/${searchTerm}`);
                    setOrders(response.data.data || []);
                } catch (error) {
                    console.error('Error fetching filtered orders:', error);
                }
            } else {
                const response = await axios.get(`/api/orders/get?page=${page}&limit=${limit}`);
                setOrders(response.data.data || []);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchFilteredOrders();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, page]);

    const handlePagination = (pageNum) => {
        setPage(pageNum);
    };

    // Helper function to map service types
    const getServiceTypeName = (serviceType) => {
        switch (serviceType) {
            case 'bookbus':
                return 'Bus';
            case 'bookflight':
                return 'Flight';
            case 'bookhotel':
                return 'Hotel';
            case 'recharge':
                return 'Recharge';
            case 'booktrain':
                return 'Train';
            default:
                return 'Unknown';
        }
    };

    return (
        <Container>
            <Form.Group controlId="search" className='m-2'>
                <Form.Control
                    type="text"
                    placeholder="Search by Order ID or Client Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Service Type</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.clientName}</td>
                                <td>{getServiceTypeName(order.serviceType)}</td>
                                <td>{order.orderId}</td>
                                <td>{order.amount}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item 
                        key={index + 1} 
                        active={index + 1 === page} 
                        onClick={() => handlePagination(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default OrdersTable;
