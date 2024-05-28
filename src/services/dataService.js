const { Data } = require('../models/models');

const getData = async (deviceId) => {
    console.log(`Querying data for deviceId: ${deviceId}`);
    const data = await Data.find({ deviceId }).sort({ timestamp: -1 }).limit(100);
    console.log(`Data retrieved: ${JSON.stringify(data)}`);
    return data;
};

module.exports = { getData };
