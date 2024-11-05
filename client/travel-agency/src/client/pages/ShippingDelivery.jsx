import React from 'react';
import ClientFooter from '../components/ClientFooter';

const ShippingDelivery = () => {
    return (
        <>
            <div className="policy-container">
                <h1>Shipping and Delivery Policy</h1>

                <h2>1. Delivery of Services</h2>
                <p>Yara Holidays & Cabs Private Limited does not engage in the shipping of physical goods. However, all booking confirmations, itineraries, invoices, and receipts will be sent electronically to the registered email address.</p>

                <h2>2. Electronic Delivery</h2>
                <p>All documents related to your booking, including tickets, vouchers, and receipts, will be sent via email. You are responsible for ensuring that your email address is correct and accessible.</p>

                <h2>3. Service Delivery Time</h2>
                <p>We aim to confirm all bookings within 24 hours of the request. In cases of high demand or other delays, the confirmation may take longer, and you will be notified accordingly.</p>
            </div>
            <ClientFooter />
        </>
    );
};

export default ShippingDelivery;
