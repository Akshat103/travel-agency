import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminHome = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalOrders: 0,
    totalAmounts: [],
    ordersPerServiceType: [],
    lastOrders: [] 
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const totalOrdersCount = await axios.get('/api/analytics/total-orders-count');
        const totalAmountByStatus = await axios.get('/api/analytics/total-amount-by-status');
        const ordersPerServiceType = await axios.get('/api/analytics/orders-per-service-type');
        const lastOrdersResponse = await axios.get('/api/analytics/latest-orders');

        setAnalyticsData({
          totalOrders: totalOrdersCount.data.totalOrders,
          totalAmounts: totalAmountByStatus.data,
          ordersPerServiceType: ordersPerServiceType.data,
          lastOrders: lastOrdersResponse.data
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Prepare data for charts
  const pieData = analyticsData.totalAmounts.map(item => ({
    name: item.status,
    value: item.totalAmount
  }));

  const barData = analyticsData.ordersPerServiceType.map(item => ({
    serviceType: item._id,
    count: item.count
  }));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 45%', margin: '10px' }}>
          <h4 style={{ margin: '0' }}>Order Amounts by Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <h5>Total Orders: {analyticsData.totalOrders}</h5>
        </div>

        <div style={{ flex: '1 1 45%', margin: '10px' }}>
          <h4 style={{ margin: '0' }}>Orders Per Service Type</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="serviceType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h4>Last 10 Orders</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Client Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.lastOrders.map((order, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.clientName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.serviceType}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.orderId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.amount}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminHome;
