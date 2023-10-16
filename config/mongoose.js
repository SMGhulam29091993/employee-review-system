const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ers_db');

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting with the db'));

db.once('open', ()=>{
    console.log('Connection with the db is successfully made!');
});

module.exports = db;
