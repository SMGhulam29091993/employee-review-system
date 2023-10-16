const express = require('express');
const app = express();

const port = 8000;

const db = require('./config/mongoose');


app.listen(port, (err)=>{
    if(err){
        console.log(`Error in connecting with the server ${err}`);
        return;
    };
    console.log(`Connection with the server is made on port : ${port}`);
})