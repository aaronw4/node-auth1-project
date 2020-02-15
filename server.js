const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require('./users/usersRouter');

const sessionOptions = {
    name: "userCookie",
    secret: "secretCookie",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(session(sessionOptions));

server.use('/users', usersRouter);

module.exports = server;