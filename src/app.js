const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const server = jsonServer.create();

server.use(cors());
server.use(router);
server.use(jsonServer.bodyParser);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
