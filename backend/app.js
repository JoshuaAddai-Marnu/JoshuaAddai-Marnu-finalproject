const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs')

const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares function
app.use(express.json()) //used to parse incoming JSON data from the request body.
app.use(cors()) //Enables Cross-Origin Resource Sharing(helps frontend interacts with backend APIs)

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// starting a server and connecting to a database
const server = () => {
    db() // Call the function to connect to the database
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()