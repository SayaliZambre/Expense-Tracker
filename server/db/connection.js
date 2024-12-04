require('dotenv').config(); // Ensure dotenv is loaded

const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db => {
        console.log("Database Connected");
        return db;
    })
    .catch(err => {
        console.error("Connection Error:", err.message);
        console.error(err); // Logs full error details
    });

module.exports = conn;
