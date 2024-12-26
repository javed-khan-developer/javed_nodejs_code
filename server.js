const express = require('express')
const app = express()
const db = require('./db')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/Person')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
const PORT = process.env.PORT || 3000

//Middleware Function

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} request made to ${req.originalUrl}`);
  next();//move on to next phase
}
app.use(logRequest);

passport.use(new LocalStrategy(async (username, password, done) => {
  //authentication logic here
  try {
    console.log('Received credentials: ', username, password)
    const user = await Person.findOne({ username: username })
    if (!user)
      return done(null, false, { message: 'Incorrect Username' })
    const isPasswordMatch = user.password === password ? true : false
    if (isPasswordMatch) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Incorrect Password' })
    }
  } catch (error) {
    return done(error)
  }
}))

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
  res.send('Hello Javed')
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRotes = require('./routes/menuRoutes');

//use the routers
app.use('/person', personRoutes)
app.use('/menu', localAuthMiddleware, menuItemRotes);

app.listen(PORT, () => {
  console.log('app is listening on 3000')
}
)