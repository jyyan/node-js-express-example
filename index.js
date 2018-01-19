const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const urlencode = require('urlencode');

app.use(bodyParser.json());
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
      var msg = urlencode('已幫您完成工作了');

      request = require('request');
      var opts = {
        uri: `/${msg}`,
        method: 'POST',
      };

      request(opts , function (error, response, body) {
        console.log(error, body);
      });

      res.send(`Hello World! ${intent} : ${intent}`);
    } else {
      res.send('bad req');
    }
  }).listen(PORT, () => console.log(`Listening on ${ PORT }`))
