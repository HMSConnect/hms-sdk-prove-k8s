const next = require('next');
const routes = require('./routes.js');
const dotenv = require('dotenv');
const path = require('path');
const moment = require('moment');
const WebSocket = require('ws');

const env = process.env.NODE_ENV.trim() || 'development';
dotenv.config({ path: path.join(__dirname, '.env.' + env) });
const dev = process.env.NODE_ENV.trim() === 'development';
// const dev = process.env.NODE_ENV.trim() !== 'production'
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const port = process.env.APP_PORT;
const { createServer } = require('http');
app.prepare().then(() => {
  createServer(handler).listen(port);
});


const wss = new WebSocket.Server({ port: 3003 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('User connected...');

  setInterval(() => {
    ws.send(moment().format('YYYY-MM-DD HH:mm:ss:SSS'));
  }, 100);
});