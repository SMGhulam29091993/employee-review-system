const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

const expressLayout = require('express-ejs-layouts');

// requiring session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


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

// creating the session
app.use(session({
    name : 'ERS',
    secret : 'somethingBlah',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUserAuthenticatedUser);
app.use(passport.setAdminAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in connecting with the server ${err}`);
        return;
    };
    console.log(`Connection with the server is made on port : ${port}`);
})