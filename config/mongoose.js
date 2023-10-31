const mongoose = require('mongoose');
const env = require('./environment');
require('dotenv').config
// mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting with the db'));

db.once('open', ()=>{
    console.log('Connection with the db is successfully made!');
});

module.exports = db;
