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

const busBook = async (req, res) => {
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

module.exports = {
    getSourceList,
    getDestinationList,
    busSearch,
    busBook
};
