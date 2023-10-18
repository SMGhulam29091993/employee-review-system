const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

const expressLayout = require('express-ejs-layouts');



// connecting with the db
const db = require('./config/mongoose');

// to read the req from users
app.use(express.urlencoded());

app.use(expressLayout);
// Middleware to serve static files
app.use(express.static('assets'));

// to extract the style and scripts from partial views
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in connecting with the server ${err}`);
        return;
    };
    console.log(`Connection with the server is made on port : ${port}`);
})