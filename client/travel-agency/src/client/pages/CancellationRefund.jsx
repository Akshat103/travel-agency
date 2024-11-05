import React from 'react';
import ClientFooter from '../components/ClientFooter';

const CancellationRefund = () => {
    return (
        <>
            <div className="policy-container">
                <h1>Cancellation and Refund Policy</h1>

                <h2>1. Cancellation by Customer</h2>
                <p>Cancellations made within an allowable timeframe before the scheduled service may be eligible for a full refund, subject to a processing fee. Cancellations made outside of this timeframe may not be eligible for a refund. The specific cancellation terms will vary depending on the nature of the service booked.</p>

                <h2>2. Refund Process</h2>
                <p>All eligible refunds will be processed within 6 to 8 days of cancellation. Refunds will be made to the original payment method used for the booking.</p>

                <h2>3. Non-Refundable Charges</h2>
                <p>Certain fees or charges, including but not limited to processing fees and administrative charges, may not be eligible for refund.</p>
            </div>
            <ClientFooter />
        </>
    );
};

export default CancellationRefund;
