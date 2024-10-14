import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TotalOrdersCard = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get('/api/analytics/total-orders');
        if(response.data.success){
          setTotalOrders(response.data.totalOrders);
        }else{
          toast.error('Failed to fetch Total Orders');
        }
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
