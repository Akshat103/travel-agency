const axios = require('axios');

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

    const cityid = city.id;

    const data = {
        MerchantID: MEMBER_ID,
        Merchantkey: HOTEL_KEY,
        Method: "searchbycity",
        CheckInDate,
        CheckOutDate,
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
        url: HOTEL_API_URL || `${HOTEL_API_URL}/HotelNew.aspx`,
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

module.exports = {
    getCity,
    searchByCity
};
