import React, { useState, useEffect, useRef } from 'react';
import RechargeAnimation from './RechargeAnimation';
import { Card, Button, Badge } from 'react-bootstrap';

const RechargePlanCard = ({ plan, onRechargeClick }) => {
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                {/* Price and Recharge Button Row */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h3 className="mb-0 text-dark"><strong>₹{plan.recharge_amount}</strong></h3>
                        <Badge bg="light" text="dark" className="mt-1">
                            Validity: {plan.recharge_validity}
                        </Badge>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => onRechargeClick(plan.recharge_amount)}
                        className="px-4"
                    >
                        Recharge
                    </Button>
                </div>

                {/* Talktime Info */}
                <div className="mb-3 d-flex">
                    <h6 className="text-muted">Talktime {plan.recharge_talktime}</h6>
                </div>

                {/* Description */}
                <div>
                    <h6 className="text-muted mb-2">Benefits</h6>
                    <p className="mb-0 small text-secondary">
                        {plan.recharge_long_desc}
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

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
                    <RechargePlanCard
                        key={plan.id || index}
                        plan={plan}
                        onRechargeClick={handleButtonClick}
                    />
                ))
            ) : (
                <RechargeAnimation />
            )}
        </div>
    );
};

export default ListPlans;
