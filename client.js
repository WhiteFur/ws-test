'use strict';

const fs = require('fs');
const WebSocket = require('ws');

const ws = new WebSocket('wss://localhost:8070/', {
  key: fs.readFileSync('./ssl/yourkey.pem'),
  cert: fs.readFileSync('./ssl/yourcert.pem'),
  rejectUnauthorized: false
});

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

ws.on('open', function open() {
  console.log('1: cardIn, 2: billIn, 3: billStacked \n')
  rl.on('line', line => {
    let obj;
    switch(parseInt(line)){
      case 1:
        obj = {event: 'cardIn', "serial": "A100180758"};
        break;
      case 2:
        obj = {event: 'billIn', "amount": 50};
        break;
      case 3:
        obj = {event: 'billStacked'};
        break;
      default:
        break;
    }


    let str = JSON.stringify(obj);
    console.log(`json str: ${str}`);
    ws.send(str, err => {
      if(err){
        console.dir(`Error: ${err}`);
      }
    });
    console.log('1: cardIn, 2: billIn, 3: billStacked \n')
  });
});





ws.on('message', function incoming(data, flags) {
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
  console.log('whitefur from server');
  console.dir(data);
  });
