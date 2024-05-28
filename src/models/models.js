const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {timestamps: true})

const dataSchema = new Schema ({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Device'
    },
    temperature: {
        type: Number
    },
    timestamp: {
        type: Date
    }
})

const Device = mongoose.model('Device', deviceSchema);
const Data = mongoose.model('Data', dataSchema);

module.exports = { Device, Data };