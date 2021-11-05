require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 50000;

server.listen(port, () => {
    console.log(`Server up on port ${port}.`)
})