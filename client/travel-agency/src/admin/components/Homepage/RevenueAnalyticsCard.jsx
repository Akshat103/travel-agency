import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const RevenueAnalyticsCard = () => {
  const [revenueAnalytics, setRevenueAnalytics] = useState({ totalRevenue: 0, avgOrderValue: 0 });

  useEffect(() => {
    const fetchRevenueAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics/revenue-analytics');
        setRevenueAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching revenue analytics:', error);
      }
    };

    fetchRevenueAnalytics();
  }, []);

  return (
    <Card>
      <Card.Header>Revenue Analytics</Card.Header>
      <Card.Body>
        <p>Total Revenue: ₹{revenueAnalytics.totalRevenue.toFixed(2)}</p>
        <p>Average Order Value: ₹{revenueAnalytics.avgOrderValue.toFixed(2)}</p>
      </Card.Body>
    </Card>
  );
};

export default RevenueAnalyticsCard;
