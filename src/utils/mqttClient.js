const mqtt = require('mqtt');
const config = require('../config/config');
const { Data } = require('../models/models');

const mqttClient = mqtt.connect(`mqtt://${config.mqtt.host}:${config.mqtt.port}`);

mqttClient.on('connect', () => {
    console.log('MQTT connected');
    mqttClient.subscribe('iot/temperature', (err) => {
        if (err) {
            console.log('Subscription error:', err);
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    console.log(`Message received on topic ${topic}: ${message.toString()}`);

    try {
        const data = JSON.parse(message.toString());
        // Assume the incoming message contains `deviceId`, `temperature`, and `timestamp`
        const dataEntry = new Data({
            deviceId: data.deviceId,
            temperature: data.temperature,
            timestamp: new Date()
        });

        await dataEntry.save();
        console.log('Data saved to MongoDB');
    } catch (error) {
        console.log('Error saving data to MongoDB:', error);
    }
});

module.exports = { mqttClient };
