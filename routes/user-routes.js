const express = require('express');
const _ = require('lodash');
const config = require('../config');
const jwt = require('jsonwebtoken');

const app = module.exports = express.Router();

// dummy database :-)

const users = [{
    id: 1,
    username: 'raf',
    password: 'turbo'
}];

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60 * 60 * 5 });
}

function getUserScheme(req) {
    let username;
    let type;
    let userSearch = {};

    // The POST contains a username and not an email
    if (req.body.username) {
        username = req.body.username;
        type = 'username';
        userSearch = { username };
    }
    // The POST contains an email and not an username
    else if (req.body.email) {
        username = req.body.email;
        type = 'email';
        userSearch = { email: username };
    }

    return {
        username,
        type,
        userSearch
    };
}

app.post('/users', (req, res) => {
    const userScheme = getUserScheme(req);

    if (!userScheme.username || !req.body.password) {
        return res.status(400).send('You must send the username and the password');
    }

    if (_.find(users, userScheme.userSearch)) {
        return res.status(400).send('A user with that username already exists');
    }

    const profile = _.pick(req.body, userScheme.type, 'password', 'extra');
    profile.id = _.max(users, 'id').id + 1;

    users.push(profile);

    res.status(201).send({
        id_token: createToken(profile)
    });
});

app.post('/sessions/create', (req, res) => {
    const userScheme = getUserScheme(req);

    if (!userScheme.username || !req.body.password) {
        return res.status(400).send('You must send the username and the password');
    }

    const user = _.find(users, userScheme.userSearch);

    if (!user) {
        return res.status(401).send("The username or password don't match");
    }

    if (user.password !== req.body.password) {
        return res.status(401).send("The username or password don't match");
    }

    res.status(201).send({
        id_token: createToken(user)
    });
});
