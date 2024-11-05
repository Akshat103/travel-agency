import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VITE_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (typeof Razorpay !== "undefined") {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.head.appendChild(script);
    });
};

function getServiceType(serviceType) {
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
}

const usePayment = () => {

    if (Razorpay) {
        loadRazorpayScript();
    }

    const navigate = useNavigate();

    const payment = async (amount, receipt, serviceType, serviceDetails) => {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            console.error("Razorpay SDK failed to load. Are you online?");
            return;
        }
        try {
            const { data } = await axios.get(`/api/services/${getServiceType(serviceType)}`);

            const convenienceFee = (data.charge / 100) * amount;

            let totalAmount = amount;

            if (getServiceType(serviceType) === "IRCTC") {
                totalAmount += data.charge;
            } else {
                totalAmount += convenienceFee;
            }

            const { data: { order_id } } = await axios.post('/api/create-order', {
                amount: totalAmount.toFixed(2),
                receipt,
                serviceType,
                serviceDetails
            });

            return new Promise((resolve, reject) => {
                const options = {
                    "key": VITE_RAZORPAY_KEY_ID,
                    "order_id": order_id,
                    "amount": totalAmount,
                    "currency": "INR",
                    "name": "Yara Holidays",
                    "description": `Payment for ${getServiceType(serviceType)}. Includes a convenience fee of ₹${convenienceFee}`,
                    "handler": async function (response) {
                        // Show processing toast immediately after payment
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

                            // Close the processing toast
                            toast.dismiss(processingToastId);

                            if (data.success && serviceType === "bookbus") {
                                navigate('/success', { state: { message: `Booking ID: ${data.data.booking_id}` } });
                            } else if (data.success && serviceType === "bookflight") {
                                navigate('/success', { state: { message: `Booking ID: ${data.data.Booking_RefNo}` } });
                            } else if (data.success && serviceType === "irctcOnboard") {
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
                                toast.error(error.response.data.message);
                                navigate('/failure');
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
