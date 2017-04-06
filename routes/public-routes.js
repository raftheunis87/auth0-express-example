const express = require('express');

const app = module.exports = express.Router();

app.get('/api/public/quote', (req, res) => {
    res.status(200).send('This is a response from the public api!');
});
