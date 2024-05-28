const { registerDevice, getDevices } = require('../services/deviceService');

const register = async (req, res) => {
    try {
        const device = await registerDevice(req.body);
        res.status(201).json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const list = async (req, res) => {
    try {
        const devices = await getDevices();
        res.status(200).json(devices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, list };
