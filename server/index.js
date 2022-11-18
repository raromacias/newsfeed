require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {register, login} = require('./controllers/authCtrl')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login', login)

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))