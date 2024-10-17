const BookingLog = require('../models/BusBookingLog');
const OrderSchema = require('../models/Order');
const axios = require('axios');
require('dotenv').config();

const { BUS_API_URL, MERCHANT_KEY, MEMBER_ID } = process.env;

const getSourceList = async (req, res) => {
    try {
        const data = {
            "AuthData": {
                "Merchantkey": MERCHANT_KEY,
                "MerchantID": MEMBER_ID,
                "TypeData": "json"
            }
        };

        const apiResponse = await axios.post(`${BUS_API_URL}/GetSourceList`, data);

        if (apiResponse.status === 200) {
            const responseData = apiResponse.data;

            let cleanedData;
            if (typeof responseData === 'string') {
                cleanedData = JSON.parse(responseData);
            } else {
                cleanedData = responseData;
            }

            if (cleanedData && cleanedData.data) {
                res.json(cleanedData.data);
            } else {
                res.status(400).json({ message: "Data not found in API response." });
            }
        } else {
            res.status(400).json({ message: "Failed to fetch data from API." });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

const getDestinationList = async (req, res) => {
    try {
        const { source } = req.body;

        const data = {
            "AuthData": {
                "Merchantkey": MERCHANT_KEY,
                "MerchantID": MEMBER_ID,
                "TypeData": "json"
            },
            "request": {
                "source": source
            }
        };
        const apiResponse = await axios.post(`${BUS_API_URL}/GetDestinationList`, data);

        if (apiResponse.status === 200) {
            const responseData = apiResponse.data;
            let cleanedData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;
            if (cleanedData && cleanedData.data) {
                res.json(cleanedData.data);
            } else {
                res.status(400).json({ message: "Data not found in API response." });
            }
        } else {
            res.status(400).json({ message: "Failed to fetch data from API." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

const busSearch = async (req, res) => {
    try {
        const { source, destination, doj } = req.body;

        const data = {
            "request": {
                "source": source,
                "destination": destination,
                "doj": doj
            },
            "AuthData": {
                "Merchantkey": MERCHANT_KEY,
                "MerchantID": MEMBER_ID,
                "TypeData": "json"
            }
        };

        const apiResponse = await axios.post(`${BUS_API_URL}/BusSearch`, data);
        if (apiResponse.status === 200) {
            const responseData = apiResponse.data;
            let cleanedData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;

            if (cleanedData && cleanedData.data) {
                res.json(cleanedData.data);
            } else {
                res.status(400).json({ message: "Data not found in API response." });
            }
        } else {
            res.status(400).json({ message: "Failed to fetch data from API." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

const seatLayout = async (req, res) => {
    try {
        const { id } = req.body;

        const data = {
            "request": {
                "tripid": id
            },
            "AuthData": {
                "Merchantkey": MERCHANT_KEY,
                "MerchantID": MEMBER_ID,
                "TypeData": "json"
            }
        };

        const apiResponse = await axios.post(`${BUS_API_URL}/BusSeatLayout`, data);
        if (apiResponse.status === 200) {
            const responseData = apiResponse.data;
            let cleanedData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;

            if (cleanedData && cleanedData.data) {
                res.json(cleanedData.data);
            } else {
                res.status(400).json({ message: "Data not found in API response." });
            }
        } else {
            res.status(400).json({ message: "Failed to fetch data from API." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

const busSeatbook = async (details, clientId, orderid) => {
    try {
        const {
            source, sourceName, destinationName, destination, doj, tripid, bpid, dpid,
            mobile, email, idtype, idnumber, address, Search_Key, seats
        } = details;

        const data = {
            "request": {
                "source": source,
                "destination": destination,
                "doj": doj,
                "tripid": tripid,
                "bpid": bpid,
                "dpid": dpid,
                "mobile": mobile,
                "email": email,
                "clientID": clientId,
                "idtype": idtype,
                "idnumber": idnumber,
                "address": address,
                "Search_Key": Search_Key,
                "seats": seats
            },
            "AuthData": {
                "Merchantkey": MERCHANT_KEY,
                "MerchantID": MEMBER_ID,
                "TypeData": "json"
            }
        };

        const apiResponse = await axios.post(`${BUS_API_URL}/BusSeatblock`, data);

        if (apiResponse.status === 200) {
            const responseData = apiResponse.data;
            let cleanedData = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;

            if (cleanedData && cleanedData.data) {
                const bookingId = cleanedData.data.booking_id;

                const bookTicketData = {
                    "request": {
                        "booking_id": bookingId,
                        "agentid": clientId
                    },
                    "AuthData": {
                        "Merchantkey": MERCHANT_KEY,
                        "MerchantID": MEMBER_ID,
                        "TypeData": "json"
                    }
                };

                const ticketResponse = await axios.post(`${BUS_API_URL}/BookTicket`, bookTicketData);
                console.log(ticketResponse.data)
                if (ticketResponse.status === 200) {
                    const ticketResponseData = ticketResponse.data;

                    cleanedData = typeof ticketResponseData === 'string' ? JSON.parse(ticketResponseData) : ticketResponseData;
console.log(cleanedData.data)
                    const updatedOrder = await OrderSchema.findOneAndUpdate(
                        { orderId: orderid },
                        { serviceResponse: cleanedData.data },
                        { new: true }
                    );

                    if (!updatedOrder) {
                        throw new Error('Failed to update order with recharge response');
                    }
            
                    if (cleanedData.data.success === true) {
                        return cleanedData.data;
                    } else {
                        return false;
                    }
                } else {
                    throw new Error(`Failed to book the ticket: ${ticketResponse.statusText}`);
                }
            } else {
                throw new Error(`Invalid response data: ${JSON.stringify(cleanedData)}`);
            }
        } else {
            throw new Error(`Failed to fetch data from API: ${apiResponse.statusText}`);
        }
    } catch (error) {
        console.error("Error during bus seat booking:", error);
        throw new Error(`Bus seat booking failed: ${error.message}`);
    }
};

module.exports = {
    getSourceList,
    getDestinationList,
    busSearch,
    seatLayout,
    busSeatbook
};
