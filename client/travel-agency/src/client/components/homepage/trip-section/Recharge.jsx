import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setNumber, setOperator, setCircle, setOperators, setCircles, setDataFetched } from '../../../../redux/rechargeSlice';

const Recharge = ({ context, onDetailsChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { number, operator, circle, operators, circles, dataFetched } = useSelector((state) => state.recharge);
  useEffect(() => {
    if (number.length === 3 && !dataFetched) {
      fetchOperatorsAndCircles();
    }
  }, [number, dataFetched]);

  const fetchOperatorsAndCircles = async () => {
    try {
      const [operatorResponse, circleResponse] = await Promise.all([
        axios.get('/api/get-operator'),
        axios.get('/api/get-circle'),
      ]);

      if (operatorResponse.data[0].Status === '1') {
        dispatch(setOperators(operatorResponse.data[0].data[0].data));
      } else {
        toast.error('Failed to fetch operators data');
      }

      if (circleResponse.data[0].Status === '1') {
        dispatch(setCircles(circleResponse.data[0].data));
      } else {
        toast.error('Failed to fetch circles data');
      }

      dispatch(setDataFetched(true));
    } catch (error) {
      toast.error('Failed to fetch operators or circles.');
    }
  };

  const handleNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length <= 10) {
      dispatch(setNumber(inputValue));
    }
  };

  const handleSubmit = () => {
    if (context === 'home' && dataFetched && operators.length > 0 && circles.length > 0) {
      navigate('/mobile-recharge', {
        state: { number, operator, circle, operators, circles },
      });
    } else if (context === 'recharge' && onDetailsChange) {
      onDetailsChange(number, operator, circle);
    } else {
      toast.error('Please ensure all data is loaded correctly before proceeding.');
    }
  };

  return (
    <div className="tab-pane" id="reacharge" role="tabpanel" aria-labelledby="reacharge-tab">
      <div className="row">
        <div className="col-lg-12">
          <div className="tour_search_form">
            <div>
            <div className={`${context === 'recharge' ? 'col' : 'row'}`}>
                <div className={`${context==='recharge' ? 'm-1': 'col-lg-4 col-md-6 col-sm-12 col-12'}`}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={number}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className={`${context==='recharge' ? 'm-1': 'col-lg-4 col-md-6 col-sm-12 col-12'}`}>
                  <select
                    className="form-control"
                    value={operator}
                    onChange={(e) => dispatch(setOperator(e.target.value))}
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
                <div className={`${context==='recharge' ? 'm-1': 'col-lg-4 col-md-6 col-sm-12 col-12'}`}>
                  <select
                    className="form-control"
                    value={circle}
                    onChange={(e) => dispatch(setCircle(e.target.value))}
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
                <div onClick={handleSubmit} className="top_form_search_button">
                  <button className="btn btn_theme btn_md" type="submit">
                    View Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
