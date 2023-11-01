const mongoose = require('mongoose');
require('dotenv').config();




mongoose.connect(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);



const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting with the db'));

db.once('open', ()=>{
    console.log('Connection with the db is successfully made!');
});

module.exports = db;
