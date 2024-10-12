import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';

const OrdersPerServiceTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics/orders-per-service-type');
        const transformedData = response.data.map(item => ({
          ...item,
          _id: 
            item._id === 'bookbus' ? 'Bus' : 
            item._id === 'bookflight' ? 'Flight' : 
            item._id === 'bookhotel' ? 'Hotel' : 
            item._id === 'recharge' ? 'Recharge' : 
            item._id === 'booktrain' ? 'Train' : 
            item._id
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching orders per service type:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header>Orders Per Service</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default OrdersPerServiceTypeChart;
