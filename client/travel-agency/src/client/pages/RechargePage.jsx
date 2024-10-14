import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Recharge from '../components/homepage/trip-section/Recharge';
import ListPlans from '../components/rechargepage/ListPlans';
import RechargeFilter from '../components/rechargepage/RechargeFilter';
import { setNumber, setOperator, setCircle } from '../../redux/rechargeSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import usePayment from '../../utils/payment';

const RechargePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { number: initialNumber, operator: initialOperator, circle: initialCircle } = location.state || {};
  const { payment } = usePayment();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    if (initialNumber && initialOperator && initialCircle) {
      if (initialNumber.length < 10) return;
      dispatch(setNumber(initialNumber));
      dispatch(setOperator(initialOperator));
      dispatch(setCircle(initialCircle));
      fetchPlans(initialNumber, initialOperator, initialCircle);
    }
  }, [initialNumber, initialOperator, initialCircle, dispatch]);

  const fetchPlans = async (number, operator, circle) => {
    try {
      const response = await axios.post('/api/get-plans', {
        operatorCode: operator,
        circleCode: circle,
        mobileNumber: number
      });

      if (response.data.Status === "0" && Array.isArray(response.data.PlanDescription)) {
        const allPlans = response.data.PlanDescription;
        setPlans(allPlans);
        setFilteredPlans(allPlans);
      } else {
        console.error('Invalid data structure:', response.data);
        setPlans([]);
        setFilteredPlans([]);
        toast.error('Failed to fetch plans. Please try again.');
      }
    } catch (error) {
      console.error('Error loading plans:', error.message);
      setPlans([]);
      setFilteredPlans([]);
      toast.error('Error fetching plans. Please check your connection and try again.');
    }
  };

  const handleDetailsChange = (newNumber, newOperator, newCircle) => {
    dispatch(setNumber(newNumber));
    dispatch(setOperator(newOperator));
    dispatch(setCircle(newCircle));
    fetchPlans(newNumber, newOperator, newCircle);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    if (type) {
      setFilteredPlans(plans.filter(plan => plan.recharge_type === type));
    } else {
      setFilteredPlans(plans);
    }
  };

  const uniqueTypes = [...new Set(plans.map(plan => plan.recharge_type))];

  const handleRecharge = async (amount) => {
    if (Number(amount) > 0) {
      const receipt = `recharge_rcptid_${Math.floor(Math.random() * 10000)}`;
      const serviceType = "recharge";
      const serviceDetails = {
        number: initialNumber,
        operator: initialOperator,
        circle: initialCircle,
        amount,
      };
      payment(amount, receipt, serviceType, serviceDetails)
    } else {
      toast.error("Invalid amount. Please enter a valid amount for recharge.");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="row">
            <div className="col-12 text-center">
              <h3
                className="fw-bold text-white p-4 rounded"
                style={{
                  background: 'linear-gradient(90deg, #8c3eea, #d063f0)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                  fontSize: '1.2rem'
                }}
              >
                Stay Connected with Quick Mobile Top-Ups
              </h3>
            </div>
          </div>
          <div className="col-md-3 mt-4" style={{ borderRadius: '20px' }}>
            <Recharge
              context="recharge"
              onDetailsChange={handleDetailsChange}
            />
            <div className="m-2">
              <RechargeFilter types={uniqueTypes} onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="col-md-9">
            <ListPlans plans={filteredPlans} onRecharge={handleRecharge} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargePage;