import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Moved to separate function for clarity
const getServiceType = (serviceType) => {
    switch (serviceType) {
        case "bookflight":
            return "Flight";
        case "bookhotel":
            return "Hotel";
        case "bookbus":
            return "Bus";
        case "recharge":
            return "Recharge";
        case "irctcOnboard":
            return "IRCTC";
        default:
            return "Unknown Service Type";
    }
};

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

const usePayment = () => {
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const navigate = useNavigate();

    // Load Razorpay on mount
    useEffect(() => {
        const loadRazorpay = async () => {
            // Check if Razorpay is already loaded
            if (window.Razorpay) {
                setIsRazorpayLoaded(true);
                return;
            }

            try {
                const loaded = await loadRazorpayScript();
                setIsRazorpayLoaded(loaded);
            } catch (error) {
                console.error("Failed to load Razorpay:", error);
                toast.error("Failed to load payment system. Please try again.");
            }
        };

        loadRazorpay();
    }, []);

    const payment = async (amount, receipt, serviceType, serviceDetails) => {
        if (!isRazorpayLoaded) {
            toast.error("Payment system is still loading. Please try again in a moment.");
            return;
        }

        try {
            const { data } = await axios.get(`/api/services/${getServiceType(serviceType)}`);

            // Ensure `amount` is a number and calculate `convenienceFee`
            amount = parseFloat(amount);
            const convenienceFee = parseFloat(((data.charge / 100) * amount).toFixed(2));

            // Initialize `totalAmount` and add appropriate charge based on service type
            let totalAmount = amount;
            if (getServiceType(serviceType) === "IRCTC") {
                totalAmount += parseFloat(data.charge.toFixed(2));
            } else {
                totalAmount += convenienceFee;
            }

            // Format `totalAmount` to two decimal places for precision
            totalAmount = parseFloat(totalAmount.toFixed(2));

            // Create order
            const { data: { order_id } } = await axios.post('/api/create-order', {
                amount: totalAmount.toFixed(2),
                receipt,
                serviceType,
                serviceDetails
            });

            return new Promise((resolve, reject) => {
                const options = {
                    key: VITE_RAZORPAY_KEY_ID,
                    order_id: order_id,
                    amount: totalAmount,
                    currency: "INR",
                    name: "Yara Holidays",
                    description: `Payment for ${getServiceType(serviceType)}. Includes a convenience fee of ₹${convenienceFee}`,
                    handler: async function (response) {
                        const processingToastId = toast.info("Processing order...", {
                            autoClose: false,
                        });

                        try {
                            const { data } = await axios.post('/api/verify-payment', {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                serviceType
                            });

                            toast.dismiss(processingToastId);

                            if (data.success) {
                                switch (serviceType) {
                                    case "bookbus":
                                        navigate('/success', { state: { message: `Booking ID: ${data.data.booking_id}` } });
                                        break;
                                    case "bookflight":
                                        navigate('/success', { state: { message: `Booking ID: ${data.data.Booking_RefNo}` } });
                                        break;
                                    case "irctcOnboard":
                                        navigate('/success', { state: { message: data.message } });
                                        break;
                                    default:
                                        toast.error("Order completion failed.");
                                        reject("Order completion failed.");
                                }
                            } else {
                                toast.error("Order completion failed.");
                                reject("Order completion failed.");
                            }
                        } catch (error) {
                            toast.dismiss(processingToastId);

                            if (error.response?.status === 401) {
                                const { redirect } = error.response.data;
                                if (redirect) {
                                    navigate(redirect);
                                }
                            } else if (error.response?.data.order === false || error.response?.data.recharge === false) {
                                toast.error(error.response.data.message);
                                navigate('/failure');
                                reject(error);
                            } else {
                                toast.error(error.response?.data?.message || "Payment verification failed");
                                navigate('/failure');
                                reject(error);
                            }
                        }
                    },
                    theme: {
                        color: "#8c3eea"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

                rzp.on('payment.failed', function (response) {
                    toast.error(`Payment failed: ${response.error.description}`);
                    reject(response.error);
                });
            });
        } catch (error) {
            if (error.response?.status === 401) {
                const { redirect } = error.response.data;
                if (redirect) {
                    navigate(redirect);
                }
            } else {
                toast.error("Error occurred while creating order.");
                console.error(error);
            }
        }
    };

    return { payment, isRazorpayLoaded };
};

export default usePayment;