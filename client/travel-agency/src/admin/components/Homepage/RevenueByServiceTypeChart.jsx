import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card } from 'react-bootstrap';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RevenueByServiceTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics/revenue-by-service-type');
        if (response.data.success) {
          const transformedData = response.data.data.map(item => ({
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
        }
        else{
          toast.error('Failed to fetch Revenue');
        }
      } catch (error) {
        console.error('Error fetching revenue by service type:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header>Revenue by Service</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="totalRevenue"
              nameKey="_id"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default RevenueByServiceTypeChart;
