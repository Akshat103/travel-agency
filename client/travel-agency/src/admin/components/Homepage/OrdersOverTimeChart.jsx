import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const OrdersOverTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics/orders-over-time');
        if (response.data.success) {
          console.log(response.data)
          setData(response.data.data);
        }
        else {
          toast.error("Failed to get Orders Over Time")
        }
      } catch (error) {
        console.error('Error fetching orders over time:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header>Orders Over Time</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default OrdersOverTimeChart;
