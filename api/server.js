const express = require('express');
const server = express();

server.use(express.json());

server.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = server;