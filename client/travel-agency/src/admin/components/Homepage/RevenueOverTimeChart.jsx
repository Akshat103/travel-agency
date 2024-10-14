import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RevenueOverTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics/revenue-over-time');
        if(response.data.success){
          setData(response.data.data);
        }
        else{
          toast.error('Failed to fetch Revenue');
        }
      } catch (error) {
        console.error('Error fetching revenue over time:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header>Revenue Over Time</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend formatter={() => 'Total Revenue'} />
            <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default RevenueOverTimeChart;
