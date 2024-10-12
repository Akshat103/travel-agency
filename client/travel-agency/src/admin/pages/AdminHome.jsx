import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TotalOrdersCard from '../components/Homepage/TotalOrdersCard';
import RevenueAnalyticsCard from '../components/Homepage/RevenueAnalyticsCard';
import OrdersPerServiceTypeChart from '../components/Homepage/OrdersPerServiceTypeChart';
import RevenueByServiceTypeChart from '../components/Homepage/RevenueByServiceTypeChart';
import OrdersOverTimeChart from '../components/Homepage/OrdersOverTimeChart';
import RevenueOverTimeChart from '../components/Homepage/RevenueOverTimeChart';
import TopClientsTable from '../components/Homepage/TopClientsTable';

const AdminDashboard = () => {
  return (
    <div>
      <Row>
        <Col md={4}>
          <TotalOrdersCard />
        </Col>
        <Col md={4}>
          <RevenueAnalyticsCard />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <OrdersPerServiceTypeChart />
        </Col>
        <Col md={6}>
          <RevenueByServiceTypeChart />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <OrdersOverTimeChart />
        </Col>
        <Col md={6}>
          <RevenueOverTimeChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <TopClientsTable />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
