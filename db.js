const mongoose = require('mongoose')
require('dotenv').config();

//define the mongodb connection url
const mongoURL = process.env.MONGODBURLLOCAL;
// const mongoURL=process.env.MONGODBURL;
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