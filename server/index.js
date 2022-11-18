require('dotenv').config()
const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Article} = require('./models/article')


const {register, login} = require('./controllers/authCtrl')
const {isAuthenticated} = require('./middleware/isAuthenticated')

User.hasMany(Article)
Article.belongsTo(User)

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login', login)

sequelize.sync()
.then(() => {
  app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))
})
.catch(err => console.log(err))