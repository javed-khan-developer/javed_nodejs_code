const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello Javed')
})

//Import the router files
const personRoutes = require('./routes/PersonRoutes');
const menuItemRotes = require('./routes/menuRoutes');

//use the routers
app.use('/person', personRoutes)
app.use('/menu', menuItemRotes);

app.listen(PORT, () => {
  console.log('app is listening on 3000')
}
)