module.exports = {
    mqtt: {
        host: process.env.MQTT_HOST,
        port: process.env.MQTT_PORT,
    },
    mongodbUri: process.env.MONGODB_URI,
};
