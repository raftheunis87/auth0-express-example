const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((err, req, res, next) => {
    if (err.name === 'StatusError') {
        res.send(err.status, err.message);
    } else {
        next(err);
    }
});

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorhandler());
}

app.use(require('./routes/public-routes'));
app.use(require('./routes/private-routes'));
app.use(require('./routes/user-routes'));

const port = process.env.PORT || 3001;

http.createServer(app).listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
});
