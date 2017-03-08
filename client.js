const WebSocket = require('ws');

//const ws = new WebSocket('ws://192.168.122.162:8090/');
const ws = new WebSocket('ws://localhost:8090/');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.122.174',
  user     : 'root',
  password : 'gama.net',
  database : 'egaming'
});

//connection.connect();

ws.on('open', function open() {
  
  //ws.send('whitefur from client');
  //setInterval(() => {
  //  ws.send('what a fucking job!!!! damn it!!!', err => {
  //    console.log('err');
  //    console.log(err);
  //  });
  //}, 1000);
  connection.query('SELECT Picture FROM Member WHERE Picture IS NOT NULL LIMIT 1', function (error, results, fields) {
    if (error) throw error;
    var pic = results[0]['Picture'];
    var string = pic.toString('hex');
    setInterval(() => {
      ws.send(string);
      console.log('send hex');
    }, 3000);
    connection.end();
  });
});


ws.on('message', function incoming(data, flags) {
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
  console.log('whitefur from server');
  console.dir(data);
  });
