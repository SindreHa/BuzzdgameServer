const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    room: {
        type: Number,
        required: true
    },
    gameMode: {
        type: String, 
        required: true
    },
    players: {
        type: Array,
        required: true
        }
})

module.exports = mongoose.model('roomModel', roomSchema)