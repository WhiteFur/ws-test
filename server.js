const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const options = {
  key: fs.readFileSync('./ssl/yourkey.pem'),
  cert: fs.readFileSync('./ssl/yourcert.pem')
};

const httpsServer = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8090);

const wss = new WebSocket.Server({server: httpsServer});

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
