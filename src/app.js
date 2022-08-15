const jsonServer = require('json-server');
const path = require('path');
// const db = require('./db.json');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const server = jsonServer.create();

server.use(router);
server.use(jsonServer.bodyParser);
server.listen(8000);
