import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const usePayment = () => {
    const navigate = useNavigate();

    const payment = async (amount, receipt, serviceType, serviceDetails) => {
        try {
            const { data: { order_id } } = await axios.post('/api/create-order', {
                amount,
                receipt,
                serviceType,
                serviceDetails
            });
    
            toast.success("Order created successfully.");
    
            return new Promise((resolve, reject) => {
                const options = {
                    "key": VITE_RAZORPAY_KEY_ID,
                    "order_id": order_id,
                    "amount": amount,
                    "currency": "INR",
                    "name": "Yara Holidays",
                    "description": `Payment for ${serviceType}`,
                    "handler": async function (response) {
                        // Show processing toast immediately after payment
                        const processingToastId = toast.info("Processing order...", {
                            autoClose: false, // Prevent auto-close
                        });
    
                        try {
                            const { data } = await axios.post('/api/verify-payment', {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                serviceType
                            });
    
                            // Close the processing toast
                            toast.dismiss(processingToastId);
    
                            if (data.success && serviceType === "bookbus") {
                                navigate('/success', { state: { message: `Booking ID: ${data.booking_id}` } });
                            } else if (data.success && serviceType === "bookflight") {
                                navigate('/success', { state: { message: `Booking ID: ${data.data.Booking_RefNo}` } });
                            } else if (data.success) {
                                navigate('/success', { state: { message: data.message } });
                            } else {
                                toast.error("Order completion failed.");
                                reject("Order completion failed.");
                            }
                        } catch (error) {
                            // Close the processing toast on error
                            toast.dismiss(processingToastId);
    
                            if (error.response && error.response.status === 401) {
                                const { redirect } = error.response.data;
                                if (redirect) {
                                    navigate(redirect);
                                }
                            } else if (error.response.data.order === false) {
                                toast.error(error.response.data.message);
                                navigate('/failure');
                                reject(error);
                            } else if (error.response.data.recharge === false) {
                                toast.error(error.response.data.message);
                                navigate('/failure');
                                reject(error);
                            } else {
                                toast.error("Error occurred during order processing.");
                                reject(error);
                            }
                        }
                    },
                    "theme": {
                        "color": "#8c3eea"
                    }
                };
    
                var rzp1 = new Razorpay(options);
                rzp1.open();
    
                rzp1.on('payment.failed', function (response) {
                    toast.error(`Payment failed: ${response.error.description}`);
                    reject(response.error);
                });
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
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

    return { payment };
};

export default usePayment;
