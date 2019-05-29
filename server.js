const express = require('express');
const router = require('./routers.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('welcome to your new API');
});

server.use('/api/posts', router);

module.exports = server;