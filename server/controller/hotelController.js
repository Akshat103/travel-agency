const axios = require('axios');
const { formatDate } = require('../utils/utils');
const { v4: uuidv4 } = require('uuid');

const { HOTEL_API_URL, HOTEL_KEY, MEMBER_ID } = process.env;

const getCity = async (req, res) => {
    try {
        if (!HOTEL_API_URL || !HOTEL_KEY || !MEMBER_ID) {
            console.error("Missing necessary environment variables.");
            return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
        }

        const { cityname } = req.body;
        if (!cityname) {
            return res.status(400).json({ msg: "City name is required." });
        }

        const response = await axios.post(`${HOTEL_API_URL}/HotelNew.aspx`, {
            MerchantID: MEMBER_ID,
            Merchantkey: HOTEL_KEY,
            Method: "getcity",
            cityname: cityname
        });

        if (!response.data || response.data.statuscode !== "TXN" || !Array.isArray(response.data.data)) {
            console.error("Unexpected API response format:", response.data);
            return res.status(502).json({ error: 'Invalid response from the hotel API.' });
        }

        const filteredData = response.data.data.filter(item =>
            item.type === "City" || item.type === "PointOfInterest"
        );

        if (filteredData.length === 0) {
            return res.status(404).json({ msg: 'No cities found for the given name.' });
        }

        res.status(200).json({
            statuscode: response.data.statuscode,
            msg: response.data.msg,
            data: filteredData
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Network or API error:", error.message);
            return res.status(502).json({ error: 'Failed to communicate with the hotel API.' });
        }

        console.error("Unexpected server error:", error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

const searchByCity = async (req, res) => {
    const {
        CheckInDate,
        CheckOutDate,
        HotelRoomDetail,
        fullName,
        city,
        RoomCount
    } = req.body.formData;

    if (!CheckInDate || !CheckOutDate || !HotelRoomDetail || !fullName || !city || !RoomCount) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields. Please ensure all fields are provided."
        });
    }

    const cityid = city.id;

    const data = {
        MerchantID: MEMBER_ID,
        Merchantkey: HOTEL_KEY,
        Method: "searchbycity",
        CheckInDate: formatDate(CheckInDate),
        CheckOutDate: formatDate(CheckOutDate),
        HotelSeedValue: "",
        HotelRoomDetail: HotelRoomDetail.map(room => {
            const { AdultCount, ChildCount, ChildAges } = room;
            const childDetails = {};

            for (let i = 0; i < ChildCount; i++) {
                childDetails[`Child${i + 1}Age`] = ChildAges[i] || 0;
            }

            return {
                AdultCount,
                ChildCount,
                ...childDetails
            };
        }),
        fullName,
        cityid,
        RoomCount
    };

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${HOTEL_API_URL}/HotelNew.aspx`,
        headers: {},
        data: data
    };

    try {
        const response = await axios(config);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error making request to external API:', error);
        return res.status(500).json({ error: 'Error fetching data from the hotel service.' });
    }
};

const hotelDetails = async (req, res) => {
    const {
        hotelKey,
        searchKey
    } = req.body;

    if (!hotelKey || !searchKey) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields. Please ensure all fields are provided."
        });
    }

    const data = {
        MerchantID: MEMBER_ID,
        Merchantkey: HOTEL_KEY,
        Method: "hoteldetails",
        HotelKey: hotelKey,
        SearchKey: searchKey
    };

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${HOTEL_API_URL}/HotelNew.aspx`,
        headers: {},
        data: data
    };

    try {
        const response = await axios(config);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error making request to external API:', error);
        return res.status(500).json({ error: 'Error fetching data from the hotel service.' });
    }
};

const bookHotel = async (req, res) => {
    const {
        customerDetails,
        hotelId,
        hotelKey,
        recommendationId,
        rateplanId,
        hotelSearchDetails,
        searchKey
    } = req.body;

    const occupantDetails = customerDetails.OccupantDetails.map((occupant, index) => ({
        OccupantID: occupant.OccupantID,
        FirstName: occupant.FirstName,
        LastName: occupant.LastName,
        OccupantType: occupant.OccupantType,
        RoomNo: occupant.RoomNo,
        Title: occupant.Title
    }));
    
    const orderid = uuidv4();

    const data = {
        MerchantID: MEMBER_ID,
        Merchantkey: HOTEL_KEY,
        Method: "hoteltempbooking",
        orderid: orderid,
        hotelid: hotelId,
        OccupantEmail: customerDetails.OccupantEmail,
        OccupantMobile: customerDetails.OccupantMobile,
        RecommendationId: recommendationId,
        RateplanId: rateplanId,
        CustomerAddress: customerDetails.CustomerAddress,
        CustomerMobile: customerDetails.OccupantMobile,
        CustomerName: customerDetails.CustomerName,
        CustomerPostalCode: customerDetails.CustomerPostalCode,
        OccupantDetails: occupantDetails,
        hotelSearchInput: {
            CheckInDate: formatDate(hotelSearchDetails.CheckInDate),
            CheckOutDate: formatDate(hotelSearchDetails.CheckOutDate),
            HotelSeedValue: "",
            HotelRoomDetail: hotelSearchDetails.HotelRoomDetail.map(room => {
                const { AdultCount, ChildCount, ChildAges } = room;
                const childDetails = {};
    
                for (let i = 0; i < ChildCount; i++) {
                    childDetails[`Child${i + 1}Age`] = ChildAges[i] || 0;
                }
    
                return {
                    AdultCount,
                    ChildCount,
                    ...childDetails
                };
            }),
            fullName: hotelSearchDetails.fullName,
            cityid: hotelSearchDetails.city.id,
            RoomCount: hotelSearchDetails.RoomCount
        },
        Remarks: "Self booking",
        HotelKey: hotelKey,
        SearchKey: searchKey
    };
    
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${HOTEL_API_URL}/HotelNew.aspx`,
        headers: {},
        data: data
    };

    console.log(data)

    try {
        // const response = await axios(config);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error making request to external API:', error);
        return res.status(500).json({ error: 'Error fetching data from the hotel service.' });
    }
};

module.exports = {
    getCity,
    searchByCity,
    hotelDetails,
    bookHotel
};
