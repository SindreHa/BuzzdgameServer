#!/usr/bin/env node

const express = require("express")
const app = express()
var cors = require('cors')
const mongoose = require("mongoose")
app.use(cors())
mongoose.connect('mongodb+srv://BuzzdAdmin:Bachelor2020@bachelorcluster-seq7b.azure.mongodb.net/test',{useNewUrlParser: true,  useUnifiedTopology: true });
// mongoose.connect()

const db = mongoose.connection
db.on('error', (error) => console.log(error)) 
db.once('open', () => console.log('Conneted to Database'))

app.use(express.json())

const roomsRouter = require('./routes/room') 
app.use('/rooms', roomsRouter)   

// Start locahost 
app.listen(process.env.PORT || 3000, () => console.log('Server started'))