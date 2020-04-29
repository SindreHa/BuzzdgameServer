const express = require('express')
const router = express.Router()
const Room = require('../model/roommodel')

// Getting all
router.get('/', async(req,res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (err) {
       res.status(500).json({ message: err.message })
    }
 

})

// Getting one
router.get('/:id', getRooms, (req,res) => {
    res.json(res.rooms)
})

// Creating one 
router.post('/', async (req, res) => {
    const room = new Room({  // Subscriber model
        room: req.body.room, // Change values 
        gameMode: req.body.gameMode, // Change values
        players: req.body.players
    })

    try {
        const newRoom = await room.save()
        res.status(201).json(room)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// good 

// Updating One
router.patch('/:id',getRooms, async (req, res) => {
    if (req.body.room != null) {
        res.room.room = req.body.room
    }
    if (req.body.gameMode != null) {
        res.room.gameMode = req.body.gameMode
    }
    if (req.body.players != null) {
        res.room.players = req.body.players
    }
    try {
        const updatedRoom = await res.room.save()
        res.json(updatedRoom)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One 
router.delete('/:id', getRooms, async (req, res) => {
    try {
        await res.room.remove()
        res.json({ message: 'Deleted Room' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware
async function getRooms(req, res, next) {
    let room
    try{
        room = await Room.findById(req.params.id)
        if (room == null) {
            return res.status(404).json({ message: 'Cannot find Room' })
        }
    } catch (err) {
        return res.status(500).json({ messsage: err.message })
    }

    res.room = room
    next()
}


module.exports = router

