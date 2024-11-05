import React from 'react';
import ClientFooter from '../components/ClientFooter';

const PrivacyPolicy = () => {
    return (
        <>
            <div className="policy-container">
                <h1>Privacy Policy</h1>
                <p>Yara Holidays & Cabs Private Limited ("we," "us," or "our") is committed to protecting the privacy and confidentiality of personal information of users ("you" or "your"). This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our services, including our website and mobile applications.</p>

                <h2>1. Information We Collect</h2>
                <p><strong>Personal Information</strong>: When you book our services or interact with us, we may collect personal information such as your name, contact details, payment information, and travel preferences.</p>
                <p><strong>Usage Data</strong>: We collect data on how you interact with our platform, including IP addresses, browser types, device information, and other data related to your interaction with our services.</p>
                <p><strong>Cookies and Similar Technologies</strong>: We use cookies and similar tracking technologies to enhance user experience, analyze trends, and gather demographic information.</p>

                <h2>2. Use of Information</h2>
                <p>To provide, maintain, and improve our services, including processing bookings, payments, and customer support. To communicate with you about promotions, offers, or updates related to our services.</p>

                <h2>3. Disclosure of Information</h2>
                <p>We may disclose your information to our partners, service providers, or authorities as required by law, or in the course of providing our services.</p>

                <h2>4. Security of Information</h2>
                <p>We employ industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, we cannot guarantee absolute security.</p>

                <h2>5. Your Rights</h2>
                <p>You have the right to access, modify, or delete your personal data in our possession. To exercise these rights, please contact us at info@yaraholidays.com.</p>
            </div>
            <ClientFooter />
        </>
    );
};

export default PrivacyPolicy;
