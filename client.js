const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8090/');

ws.on('open', function open() {
  ws.send('whitefur from client');
});

ws.on('message', function incoming(data, flags) {
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
  console.log('whitefur from server');
  console.dir(data);
  });
