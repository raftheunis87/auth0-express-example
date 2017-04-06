const express = require('express');
const jwt = require('express-jwt');
const config = require('../config');

const app = module.exports = express.Router();

const jwtCheck = jwt({
    secret: config.secret
});

app.use('/api/private', jwtCheck);
app.use('/api/private/quote', (req, res) => {
    res.status(200).send('This is a response from the private api!');
});
