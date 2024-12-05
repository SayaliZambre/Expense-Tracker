const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

const connectDatabase = require('./db/connection.js');

app.use(cors());
app.use(express.json());

// Importing routes
app.use(require('./routes/api'));

connectDatabase
    .then((db) => {
        if (!db) return process.exit(1);

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on: http://localhost:${port}`);
        });

        app.on('error', (err) =>
            console.log(`Failed to connect with HTTP server: ${err}`)
        );
    })
    .catch((error) => {
        console.log(`Database connection failed: ${error}`);
    });
