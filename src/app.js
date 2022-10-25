const express = require('express');
var app = express();
const cors = require('cors');

// Settings
app.use(cors());

app.use(express.json());

// Routes
app.use('/api', require('./routes/api_routes'))

module.exports = app;