// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');

const port = process.env.PORT || 3000;

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(auth);
server.use(router);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server Listening on:${port}`);
});
