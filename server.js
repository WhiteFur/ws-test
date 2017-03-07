const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8090 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

  setInterval(() => {
    ws.send('what a fucking job!!!! damn it!!!', err => {
      console.log(err);
    });
  }, 10000);
});
