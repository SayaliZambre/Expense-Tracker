// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8080;

const con = require('./db/connection.js');

app.use(cors());
app.use(express.json());


app.use(require('./routes/route'));

con.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server 
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
    // error in mondb connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});