import React from 'react';
import ClientFooter from '../components/ClientFooter';

const TermsAndConditions = () => {
    return (
        <>
            <div className="policy-container">
                <h1>Terms and Conditions</h1>
                <p>By accessing or using the services provided by Yara Holidays & Cabs Private Limited, you agree to comply with and be bound by the following Terms and Conditions.</p>

                <h2>1. Services</h2>
                <p>We provide cab rental and holiday planning services subject to availability and as per the details provided at the time of booking. We reserve the right to refuse or cancel bookings at our discretion.</p>

                <h2>2. User Obligations</h2>
                <p>You agree to provide accurate information when booking and comply with all laws and regulations while using our services.</p>

                <h2>3. Liability</h2>
                <p>We strive to provide reliable and timely services. However, we are not liable for delays or issues arising from events beyond our control, including, but not limited to, natural disasters, traffic delays, or third-party errors.</p>

                <h2>4. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms and Conditions at any time. Your continued use of our services after any changes indicate your acceptance of the new terms.</p>
            </div>
            <ClientFooter />
        </>
    );
};

export default TermsAndConditions;
