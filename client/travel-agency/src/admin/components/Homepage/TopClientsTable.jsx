import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card } from 'react-bootstrap';

const TopClientsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/analytics/top-clients');
        if (response.data.success) {
          setData(response.data.data);
        }
        else {
          toast.error('Failed to fetch Top Clients');
        }
      } catch (error) {
        console.error('Error fetching top clients:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Card.Header>Top Clients</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Total Revenue</th>
              <th>Order Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => (
              <tr key={index}>
                <td>{client._id}</td>
                <td>₹{client.totalRevenue.toFixed(2)}</td>
                <td>{client.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TopClientsTable;
