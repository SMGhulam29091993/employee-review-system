const express = require('express');
const app = express();

const port = 8000;

// connecting with the db
const db = require('./config/mongoose');

// to read the req from users
app.use(express.urlencoded());


// setting ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in connecting with the server ${err}`);
        return;
    };
    console.log(`Connection with the server is made on port : ${port}`);
})