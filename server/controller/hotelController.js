const axios = require('axios');

const { HOTEL_API_URL, HOTEL_KEY, MEMBER_ID } = process.env;

const getCity = async (req, res) => {
    try {
        const { cityname } = req.body;

        const response = await axios.post(`${HOTEL_API_URL}/HotelNew.aspx`, {
            MerchantID: MEMBER_ID,
            Merchantkey: HOTEL_KEY,
            Method: "getcity",
            cityname: cityname
        });

        const filteredData = response.data.data.filter(item => item.type === "City");

        res.status(200).json({
            statuscode: response.data.statuscode,
            msg: response.data.msg,
            data: filteredData
        });
    } catch (error) {
        console.error("Error fetching city data:", error);
        res.status(500).json({ error: 'An error occurred while fetching city data.' });
    }
};

module.exports = { getCity };