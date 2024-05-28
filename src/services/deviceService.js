const { Device } = require('../models/models');

const registerDevice = async (deviceData) => {
    const device = new Device(deviceData);
    await device.save();
    return device;
};

const getDevices = async () => {
    return await Device.find();
};

module.exports = { registerDevice, getDevices };
