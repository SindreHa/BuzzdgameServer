const express = require('express')
const router = express.Router()
const Room = require('../model/roommodel')

const print = out => console.log(out)

/**
 * Henter all data fra room dokument
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 */
router.get('/', async(req,res) => {
    print
    print("Run get")
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (err) {
       res.status(500).json({ message: err.message })
    }
})

/**
 * Henter et bestemt rom med romkode oppgitt i forespørsel
 * @param {String} roomCode - romkode lagt til url for forespørsel
 * @function getRooms - metode som henter ut rom med romkode
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 * 
 */
router.get('/:roomCode', getRooms, (req,res) => {
    print(req + "" + res)
    print("Run get one")
    res.json(res.room)
})

/**
 * Legger til rom i database
 * @param {String} path - 
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 */
router.post('/', async (req, res) => {
    print("Run post")
    const room = new Room({  // Subscriber model
        roomCode: req.body.roomCode, // Change values 
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

/**
 * Oppdaterer rom
 * @param {String} roomCode - romkode lagt til url for forespørsel
 * @function getRooms - metode som henter ut rom med romkode
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 * 
 */
router.patch('/:roomCode',getRooms, async (req, res) => {
    print("Run patch")
    print(req.body.roomCode)
    print("før: " + res.room)
    if (req.body.roomCode != null) {
        res.roomCode = req.body.roomCode
    }
    if (req.body.gameMode != null) {
        res.gameMode = req.body.gameMode
    }
    if (req.body.players != null) {
        res.players = req.body.players
    }
    try {
        print("etter: " + res.room)
        const updatedRoom = await res.room.save()
        res.json(updatedRoom)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * Sletter spesifisert rom
 * @param {String} roomCode - romkode lagt til url for forespørsel
 * @function getRooms - metode som henter ut rom med romkode
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 * 
 */
router.delete('/:roomCode', getRooms, async (req, res) => {
    print("Run delete")
    print(res.room)
    try {
        await res.room.remove()
        res.json({ message: 'Deleted Room' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * Metode for å hente ut data
 * @param {Object} req - data for forespørsel
 * @param {Object} res - resultat fra forespørsel
 * @param {Function} next 
 */
async function getRooms(req, res, next) {
    print("Run getRooms")
    let room
    print(`params: ${req.params.roomCode}`)
    try{
        room = await Room.findOne({roomCode: req.params.roomCode})
        //room = await Room.findById(req.params.id)
        if (room == null) {
            return res.sendStatus(404)
        }
    } catch (err) {
        return res.status(500).json({ messsage: err.message })
    }

    res.room = room
    next()
}


module.exports = router

