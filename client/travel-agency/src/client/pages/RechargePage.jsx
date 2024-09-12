import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Recharge from '../components/homepage/trip-section/Recharge';
import Banner from '../components/Banner';
import ListPlans from '../components/rechargepage/ListPlans';
import RechargeFilter from '../components/rechargepage/RechargeFilter';
import { setNumber, setOperator, setCircle } from '../../redux/rechargeSlice';
import planData from './plan.json';
import { toast } from 'react-toastify';
import axios from 'axios';

const RechargePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { number: initialNumber, operator: initialOperator, circle: initialCircle } = location.state || {};

  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (initialNumber && initialOperator && initialCircle) {
      if (initialNumber.length < 10) return;
      dispatch(setNumber(initialNumber));
      dispatch(setOperator(initialOperator));
      dispatch(setCircle(initialCircle));
      fetchPlans(initialNumber, initialOperator, initialCircle);
    }
  }, [initialNumber, initialOperator, initialCircle, dispatch]);

  const fetchPlans = () => {
    try {
      if (planData.Status === "0" && Array.isArray(planData.PlanDescription)) {
        const allPlans = planData.PlanDescription;
        setPlans(allPlans);
        setFilteredPlans(allPlans);
        console.log("fetch");
      } else {
        console.error('Invalid data structure:', planData);
        setPlans([]);
        setFilteredPlans([]);
      }
    } catch (error) {
      console.error('Error loading plans:', error.message);
      setPlans([]);
      setFilteredPlans([]);
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
      setFilteredPlans(plans.filter(plan => plan.recharge_short_desc === type));
    } else {
      setFilteredPlans(plans);
    }
  };

  const uniqueTypes = [...new Set(plans.map(plan => plan.recharge_short_desc))];

  const handleRecharge = async (amount) => {
    if (Number(amount) > 0) {
      toast.promise(
        axios.post('/api/recharge', {
          number: initialNumber,
          operator: initialOperator,
          circle: initialCircle,
          amount,
        }).then(response => {
          if (response.data.Status === "Success") {
            toast.success('Recharge successful!');
          } else {
            toast.error('Something went wrong! Please try again.');
          }
        }),
        {
          pending: 'Recharge Processing...',
          error: 'Recharge failed. Please try again.',
        }
      );
    } else {
      toast.error('Please enter a valid amount.');
    }
  }; 

  return (
    <div>
      <Banner
        title="Recharge"
        breadcrumbs={[
          { text: 'Home', link: '/' },
          { text: 'Recharge' },
        ]}
      />
      <div className="container-fluid">
        <div className="row p-2">
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
