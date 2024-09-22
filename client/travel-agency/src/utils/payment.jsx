import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

let razorpayScriptLoaded = false;

const loadRazorpayScript = () => {
    if (!razorpayScriptLoaded) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            razorpayScriptLoaded = true;
        };
        script.onerror = () => {
            toast.error("Failed to load Razorpay. Please try again later.");
        };
        document.head.appendChild(script);
    }
};

const usePayment = () => {
    const navigate = useNavigate();

    const payment = async (amount, receipt, serviceType, serviceDetails) => {
        if (!razorpayScriptLoaded) {
            loadRazorpayScript();
        }

        try {
            const { data: { order_id } } = await axios.post('/api/create-order', {
                amount,
                receipt,
                serviceType,
                serviceDetails
            });

            toast.success("Order created successfully.");

            return new Promise((resolve, reject) => {
                var options = {
                    "key": VITE_RAZORPAY_KEY_ID,
                    "order_id": order_id,
                    "amount": amount,
                    "currency": "INR",
                    "name": "Yara Holidays",
                    "description": `Payment for ${serviceType}`,
                    "handler": async function (response) {
                        toast.info("Processing payment...");
                        try {
                            const { data: { success } } = await axios.post('/api/verify-payment', {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                serviceType
                            });

                            if (success) {
                                toast.success("Payment verified successfully.");
                                resolve(success);
                            } else {
                                toast.error("Payment verification failed.");
                                reject("Payment verification failed.");
                            }
                        } catch (error) {
                            if (error.response && error.response.status === 401) {
                                const { redirect } = error.response.data;
                                if (redirect) {
                                    navigate(redirect);
                                }
                            } else {
                                toast.error("Error occurred during payment verification.");
                                reject(error);
                            }
                        }
                    },
                    "theme": {
                        "color": "#F37254"
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
