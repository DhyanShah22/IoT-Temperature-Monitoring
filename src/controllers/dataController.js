const { getData } = require('../services/dataService');

const fetchData = async (req, res) => {
    try {
        console.log(`Fetching data for deviceId: ${req.params.deviceId}`);
        const data = await getData(req.params.deviceId);
        console.log(`Data fetched: ${JSON.stringify(data)}`);
        res.status(200).json(data);
    } catch (error) {
        console.log(`Error fetching data: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { fetchData };
