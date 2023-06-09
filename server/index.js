require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const app = express()
const {sequelize} = require('./util/database')

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Express');
});



const {User} = require('./models/user')
const {Article} = require('./models/article')


const {register, login} = require('./controllers/authCtrl')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {getCurrentUserArticles, deleteArticle, addArticle} = require('./controllers/News')


User.hasMany(Article)
Article.belongsTo(User)





app.post('/register', register)
app.post('/login', login)

app.get('/favorites/:userId', isAuthenticated,getCurrentUserArticles)
app.post('/favorites/:userId', isAuthenticated, addArticle)
app.delete('/favorites/:id', isAuthenticated, deleteArticle)

sequelize.sync({})
.then(() => {
  app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))
})
.catch(err => console.log(err))