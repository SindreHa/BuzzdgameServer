const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: true
    },
    gameMode: {
        type: Number, 
        required: true
    },
    players: {
        type: Array,
        required: true
        }
})

module.exports = mongoose.model('roomModel', roomSchema)