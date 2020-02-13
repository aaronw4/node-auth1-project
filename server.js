const express = require('express');

const usersRouter = require('./users/usersRouter');

const server = express();

server.use(express.json());
server.use('/users', usersRouter);

module.exports = server;