const mongoose = require('mongoose')

//define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels' //hotel can be replaced by any name 

//setup mongodb connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

})

//get the default connection
//mongoose maintain a default connection object representing the mongodb connection
const db = mongoose.connection;

//define event listeners for database connection
db.on('connected', () => console.log('connected to Mongodb Server'))
db.on('error', (err) => console.error('error connected to Mongodb Server', err))
db.on('disConnected', () => console.log('Mongodb Server disconnected'))

//exports the database connection
module.exports = db;