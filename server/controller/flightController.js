const axios = require('axios');
const {formatDate} = require('../utils/utils');
const FLIGHT_API_SERVICE_URL = process.env.FLIGHT_API_SERVICE_URL;
const FLIGHT_ACCESS_TOKEN = process.env.FLIGHT_ACCESS_TOKEN;
const FLIGHT_TXNID = process.env.FLIGHT_TXNID;

// Helper function to send POST requests
const sendPostRequest = async (methodName, requestData) => {
    try {
        const response = await axios.post(FLIGHT_API_SERVICE_URL, {
            methodname: methodName,
            opid: methodName === 'FLIGHTCITY' ? 558 : 559,
            txnid: FLIGHT_TXNID,
            requestdata: requestData
        }, {
            headers: {
                'Access-Token': FLIGHT_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Controller to get airports from cities
const getFlightCities = async (req, res) => {
    try {
        const data = await sendPostRequest('FLIGHTCITY');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to search flights
const searchFlights = async (req, res) => {
    const { requestdata } = req.body;

    const Travel_Type = requestdata.Origin.COUNTRYCODE === requestdata.Destination.COUNTRYCODE ? "0" : "1";
    const travelDate = formatDate(requestdata.TravelDate);
    const transformedData = {
        Travel_Type: Travel_Type,
        TripInfo: [
            {
                Origin: requestdata.Origin.AIRPORTCODE,
                Destination: requestdata.Destination.AIRPORTCODE,
                TravelDate: travelDate,
                Trip_Id: "0"
            }
        ],
        Booking_Type: requestdata.Booking_Type,
        Adult_Count: requestdata.Adult_Count,
        Child_Count: requestdata.Child_Count,
        Infant_Count: requestdata.Infant_Count,
        Class_Of_Travel: requestdata.Class_Of_Travel,
        InventoryType: "0",
        AIRLINE_CODE: "",
        Filtered_Airline: []
    };

    try {
        const data = await sendPostRequest('FLIGHTSEARCH', transformedData);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFlightCities,
    searchFlights
};
