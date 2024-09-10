import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recharge = () => {
  const [number, setNumber] = useState('');
  const [operators, setOperators] = useState([]);
  const [circles, setCircles] = useState([]);
  const [operator, setOperator] = useState('');
  const [circle, setCircle] = useState('');
  const [amount, setAmount] = useState('');
  const [dataFetched, setDataFetched] = useState(false);

  const clearState = () =>{
    setNumber('');
    setOperator('');
    setCircle('');
    setAmount('');
  }
   const fetchOperatorsAndCircles = async () => {
    try {
      const operatorResponse = await axios.get('/api/get-operator');
      const circleResponse = await axios.get('/api/get-circle');
      if (operatorResponse.data[0].Status === '1') {
        setOperators(operatorResponse.data[0].data[0].data);
      }
      if (circleResponse.data[0].Status === '1') {
        setCircles(circleResponse.data[0].data);
      }
      setDataFetched(true);
    } catch (error) {
      toast.error('Failed to fetch operators or circles.');
    }
  };

  const handleNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length <= 10) {
      setNumber(inputValue);
    }
    if (inputValue.length === 3 && !dataFetched) {
      fetchOperatorsAndCircles();
    }
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    setAmount(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(amount) > 0) {
      try {
        await axios.post('/api/recharge', {
          number,
          operator,
          circle,
          amount,
        });
        toast.success('Recharge successful!');
        clearState();
      } catch (error) {
        toast.error('Recharge failed. Please try again.');
      }
    } else {
      toast.error('Please enter a valid amount.');
    }
  };

  return (
    <div className="tab-pane fade" id="reacharge" role="tabpanel" aria-labelledby="reacharge-tab">
      <ToastContainer />
      <div className="row">
        <div className="col-lg-12">
          <div className="tour_search_form">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={number}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                  <select
                    className="form-control"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    disabled={operators.length === 0}
                  >
                    <option value="">Select Operator</option>
                    {operators.map((op) => (
                      <option key={op.OperatorCode} value={op.OperatorCode}>
                        {op.OperatorName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                  <select
                    className="form-control"
                    value={circle}
                    onChange={(e) => setCircle(e.target.value)}
                    disabled={circles.length === 0}
                  >
                    <option value="">Select Circle</option>
                    {circles.map((cr) => (
                      <option key={cr.circlecode} value={cr.circlecode}>
                        {cr.circlename}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <div className="top_form_search_button">
                  <button className="btn btn_theme btn_md" type="submit">
                    Recharge
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
