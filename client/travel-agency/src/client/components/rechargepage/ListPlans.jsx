import React, { useState, useEffect, useRef } from 'react';
import RechargeAnimation from './RechargeAnimation';

const ListPlans = ({ plans, onRecharge }) => {
    const [displayedPlans, setDisplayedPlans] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        setDisplayedPlans(plans.slice(0, 20));
    }, [plans]);

    const loadMore = () => {
        setDisplayedPlans((prev) => [
            ...prev,
            ...plans.slice(prev.length, prev.length + 20),
        ]);
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                loadMore();
            }
        };

        const ref = containerRef.current;
        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, [plans]);

    const handleButtonClick = (amount) => {
        if (onRecharge) {
            onRecharge(amount);
        }
    };

    return (
        <div
            ref={containerRef}
            style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}
            className="p-4"
        >
            {displayedPlans.length > 0 ? (
                displayedPlans.map((plan, index) => (
                    <div key={plan.id || index} className="mb-1 p-2 border rounded shadow-sm">
                        <div className="container">
                            <p className='text-dark'><strong>{plan.recharge_short_desc}</strong></p>
                            <div className="row">
                                <div className="col">
                                    <p className="text-sm text-gray-600">Amount: ₹{plan.recharge_amount}</p>
                                    <p className="text-sm text-gray-600">Talktime: {plan.recharge_talktime}</p>
                                </div>
                                <div className="col d-flex justify-content-end align-items-start">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleButtonClick(plan.recharge_amount)}
                                    >
                                        Recharge
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <p className="text-sm text-gray-600">Validity: {plan.recharge_validity}</p>
                                <p className="mt-2 text-sm">{plan.recharge_long_desc}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <RechargeAnimation/>
            )}
        </div>
    );
};

export default ListPlans;