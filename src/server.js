const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const socketIo = require('socket.io')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const { mqttClient } = require('./utils/mqttClient')

const deviceRoutes = require('./routes/deviceRoutes');
const dataRoutes = require('./routes/dataRoutes');

//Initialize Express App
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Middleware
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(helmet())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        server.listen((process.env.PORT), () => {
            console.log(`Conected to DB and Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

mqttClient.on('Connect', () => {
    console.log('Connected to MQTT')
})

mqttClient.on('message', (topic, message) => {
    //Handle incoming messages
    const data = JSON.parse(message.toString())
    io.emit('temperatureData', data)
})

app.use('/api/devices', deviceRoutes);
app.use('/api/data', dataRoutes);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});