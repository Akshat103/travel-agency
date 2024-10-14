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

    const travelDate = formatDate(requestdata.TravelDate);

    let transformedData;

    if (!requestdata.DepartureDate) {
        transformedData = {
            Travel_Type: requestdata.Travel_Type,
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
            Travel_Type: requestdata.Travel_Type,
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

function getSeatDetails(data) {
    const seatDetailsArray = [];

    data.forEach(item => {
        if (item.Seat_Details) {
            if (Array.isArray(item.Seat_Details)) {
                seatDetailsArray.push(...item.Seat_Details.filter(seat => seat.ApplicablePaxTypes !== null));
            } else if (item.Seat_Details.ApplicablePaxTypes !== null) {
                seatDetailsArray.push(item.Seat_Details);
            }
        }
    });

    return seatDetailsArray;
}

const formatDateToMMDDYYYY = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const getAirSeatMap = async (req, res) => {
    const { fareId, flightKey, searchKey, reprice, passengers } = req.body;

    try {
        let updatedflightKey = flightKey;
        if (!reprice) {
            const airReprice = {
                method: 'POST',
                url: FLIGHT_API_SERVICE_URL,
                headers: {
                    'Access-Token': FLIGHT_ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
                data: {
                    methodname: "Air_Reprice",
                    opid: 568,
                    txnid: FLIGHT_TXNID,
                    requestdata: {
                        Search_Key: searchKey,
                        AirRepriceRequests: [
                            {
                                Fare_Id: fareId,
                                Flight_Key: flightKey
                            }
                        ],
                        Customer_Mobile: "1234567891"
                    }
                }
            };

            const airRepriceResponse = await axios(airReprice);
            if (airRepriceResponse.data.statuscode === "100") {
                updatedflightKey = airRepriceResponse.data.data[0].Flight.Flight_Key;

                const paxDetails = passengers.map((passenger, index) => ({
                    Pax_Id: index.toString(),
                    Pax_type: passenger.Pax_type,
                    Title: passenger.Title,
                    First_Name: passenger.First_Name,
                    Last_Name: passenger.Last_Name,
                    Gender: passenger.Gender,
                    Age: passenger.Age ? passenger.Age.toString() : "",
                    DOB: passenger.DOB ? formatDateToMMDDYYYY(passenger.DOB) : "",
                    Passport_Number: passenger.Passport_Number || "",
                    Passport_Issuing_Country: passenger.Passport_Issuing_Country || "",
                    Passport_Expiry: passenger.Passport_Expiry ? formatDateToMMDDYYYY(passenger.Passport_Expiry) : "",
                    Nationality: passenger.Nationality || "",
                    FrequentFlyerDetails: passenger.FrequentFlyerDetails || ""
                }));

                const airMapReq = {
                    method: 'POST',
                    url: FLIGHT_API_SERVICE_URL,
                    headers: {
                        'Access-Token': FLIGHT_ACCESS_TOKEN,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        methodname: 'AirSeatMaps',
                        opid: '567',
                        txnid: FLIGHT_TXNID,
                        requestdata: {
                            Search_Key: searchKey,
                            Flight_Keys: [
                                updatedflightKey
                            ],
                            PAX_Details: paxDetails
                        }
                    }
                };

                const airMapResponse = await axios(airMapReq);
                if (airMapResponse.data.statuscode === "100") {
                    const Seat_Details = airMapResponse.data.data.AirSeatMaps[0].Seat_Segments[0].Seat_Row;
                    const data = getSeatDetails(Seat_Details);
                    res.status(200).json({ data, updatedflightKey });
                } else {
                    throw new Error("Server Failure.");
                }
            }
        }

    } catch (error) {
        console.error('Error calling the API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};

const bookFlight = async (data, clientId) => {
    try {
        const ssrKeys = data.passengers.map((passenger, index) => ({
            Pax_Id: index + 1,
            SSR_Key: passenger.SSR_Key
        }));

        if (ssrKeys.some(ssr => ssr.SSR_Key === "")) {
            throw new Error("SSR key is missing for one or more passengers.");
        }

        const reqData = {
            method: 'POST',
            url: FLIGHT_API_SERVICE_URL,
            headers: {
                'Access-Token': FLIGHT_ACCESS_TOKEN,
                'Content-Type': 'application/json',
            },
            data: {
                methodname: "Air_TempBooking",
                opid: "570",
                txnid: FLIGHT_TXNID,
                requestdata: {
                    Passenger_Mobile: data.mobile,
                    Passenger_Email: data.email,
                    PAX_Details: data.passengers.map((passenger, index) => ({
                        Pax_Id: (index + 1).toString(),
                        Pax_type: passenger.Pax_type,
                        Title: passenger.Title,
                        First_Name: passenger.First_Name,
                        Last_Name: passenger.Last_Name,
                        Gender: passenger.Gender,
                        Age: passenger.Age.toString(),
                        DOB: new Date(passenger.DOB).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                        Passport_Number: passenger.Passport_Number,
                        Passport_Issuing_Country: passenger.Passport_Issuing_Country,
                        Passport_Expiry: new Date(passenger.Passport_Expiry).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                        Nationality: passenger.Nationality
                    })),
                    Fare_Id: data.fareId,
                    BookingFlightDetails: [
                        {
                            Search_Key: data.searchKey,
                            Flight_Key: data.flightKey,
                            BookingSSRDetails: ssrKeys
                        }
                    ],
                    BookingRemark: null,
                    Booking_Request_Json: {
                        Travel_Type: data.Travel_Type,
                        TripInfo: [
                            {
                                Origin: data.flightDetails.Origin.AIRPORTCODE,
                                Destination: data.flightDetails.Destination.AIRPORTCODE,
                                TravelDate: new Date(data.flightDetails.TravelDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                                Trip_Id: "0"
                            }
                        ],
                        Booking_Type: data.flightDetails.Booking_Type,
                        Adult_Count: data.flightDetails.Adult_Count,
                        Child_Count: data.flightDetails.Child_Count,
                        Infant_Count: data.flightDetails.Infant_Count,
                        Class_Of_Travel: data.flightDetails.Class_Of_Travel,
                        InventoryType: "0",
                        AIRLINE_CODE: "",
                        Filtered_Airline: []
                    }
                }
            }
        };
        // Send the request to the flight API service
        const response = await axios(reqData);
        if (response.data.statuscode === 100) {
            return response.data;
        } else {
            throw new Error(`Failed to book the ticket: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Flight seat booking failed: ${error.message}`);
    }
};

module.exports = {
    getFlightCities,
    searchFlights,
    getAirSeatMap,
    bookFlight
};
