'use strict';

const express = require('express')

const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const urlencode = require('urlencode');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/', (req, res) => {

    console.log(req.body);
    let entity = req.body.entity;
    let intent = req.body.intent;
    let token = req.body.token;

    if(token === '1111111' && entity && intent){


      switch (entity) {
        case 'power':
          switch (intent) {
            case 'open':
              set_power(true);
              break;
            case 'close':
              set_power(false);
              break;
          }
          break;
        default:
          break;
      }



      res.send(`Hello World! ${entity} : ${intent}`);
    } else {
      res.send('bad req');
    }
  }).listen(PORT, () => console.log(`Listening on ${ PORT }`));


function send_response (msg) {
  // body...
  var msg = urlencode(msg);

  var request = require('request');
  var opts = {
    uri: `/${msg}`,
    method: 'POST',
  };

  request(opts , function (error, response, body) {
    console.log(error, body);
  });
}


require("webduino-js");
require("webduino-blockly");

// re-connect client ID
var board_id = 1;
var is_connect = false;
var pin = null;
var rgbled = null;

function set_power(power_val){
  var led_color = '#aa0000';

  if(is_connect){
    console.log(`current pin val = ${pin.value} set to ${power_val}`);

    if(power_val) {
      rgbled.setColor(led_color);
      pin.value = 0;
      console.log(`set power : on`);
    } else {
      rgbled.setColor('#000000');
      pin.value = 1;
      console.log(`set power : off`);
    }
    send_response('已幫您完成工作了');
  } else {
    send_response('裝置尚未連線，請稍候再試');
  }
}

boardReady({board: 'Smart', device: '10dggDjd', transport: 'mqtt'} , true, function (board) {

  var curr_board_id = board_id++;

  send_response('裝置連線就緒');
  console.log(`boardReady! ${curr_board_id}`);

  var led_color = '#aa0000';
  var button;
  var photocell;
  var led_power = false;

  is_connect = true;

  board.systemReset();
  board.samplingInterval = 50;

  pin = getPin(board, 2);

  rgbled = getRGBLedCathode(board, 15, 12, 13);
  rgbled.setColor(led_color);


  // test : toggle power status by 10 sec.
  /*
  setInterval(() => {
    led_power = !led_power;
    set_power(led_power);
  }, 10000 );

  */
});

