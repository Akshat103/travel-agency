import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const TotalOrdersCard = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get('/api/analytics/total-orders');
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []);

  return (
    <Card>
      <Card.Header>Total Orders</Card.Header>
      <Card.Body>
        <Card.Title className="h1">{totalOrders}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default TotalOrdersCard;
