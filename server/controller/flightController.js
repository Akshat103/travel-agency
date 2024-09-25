const axios = require('axios');
const { formatDate } = require('../utils/utils');

// Ensure environment variables are defined
const FLIGHT_API_SERVICE_URL = process.env.FLIGHT_API_SERVICE_URL;
const FLIGHT_ACCESS_TOKEN = process.env.FLIGHT_ACCESS_TOKEN;
const FLIGHT_TXNID = process.env.FLIGHT_TXNID;

if (!FLIGHT_API_SERVICE_URL || !FLIGHT_ACCESS_TOKEN || !FLIGHT_TXNID) {
    throw new Error('Missing required environment variables');
}

// Function to get flight cities
const getFlightCities = async (req, res) => {
    try {
        const response = await axios.post(FLIGHT_API_SERVICE_URL, {
            methodname: 'FLIGHTCITY',
            opid: 558,
            txnid: FLIGHT_TXNID,
        }, {
            headers: {
                'Access-Token': FLIGHT_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error in getFlightCities:', error.message);
        res.status(500).json({ error: 'Failed to fetch flight cities' });
    }
};

// Function to search flights
const searchFlights = async (req, res) => {
    const { requestdata } = req.body;
    
    if (!requestdata || !requestdata.Origin || !requestdata.Destination || !requestdata.TravelDate) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    const Travel_Type = requestdata.Origin.COUNTRYCODE === requestdata.Destination.COUNTRYCODE ? "0" : "1";
    const travelDate = formatDate(requestdata.TravelDate);

    let transformedData;
    if (!requestdata.DepartureDate) {
        transformedData = {
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
    } else {
        const returnDate = formatDate(requestdata.DepartureDate);
        transformedData = {
            Travel_Type: Travel_Type,
            TripInfo: [
                {
                    Origin: requestdata.Origin.AIRPORTCODE,
                    Destination: requestdata.Destination.AIRPORTCODE,
                    TravelDate: travelDate,
                    Trip_Id: "0"
                },
                {
                    Origin: requestdata.Destination.AIRPORTCODE,
                    Destination: requestdata.Origin.AIRPORTCODE,
                    TravelDate: returnDate,
                    Trip_Id: "1"
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
    }
    
    try {
        const response = await axios.post(FLIGHT_API_SERVICE_URL, {
            methodname: 'FLIGHTSEARCH',
            opid: 559,
            txnid: FLIGHT_TXNID,
            requestdata: transformedData
        }, {
            headers: {
                'Access-Token': FLIGHT_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error in searchFlights:', error.message);
        res.status(500).json({ error: 'Failed to search flights' });
    }
};

module.exports = {
    getFlightCities,
    searchFlights
};
