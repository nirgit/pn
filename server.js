const fs = require('fs')
const VPAID_KEYS = {
    publicKey: 'BNjlC0ub2WVA5hGekdsX7bRJGQ_LpoVAujoJYA1cwDouBriHZBxQW_4Q_sLE7vSaoLQcbWqZNOhBQ9YBXQoR3YY',
    privateKey: fs.readFileSync('./vapid-pkey.txt', {encoding: 'UTF8'})
}

// console.log("pkey = ", VPAID_KEYS.private)

const webpush = require('web-push');
webpush.setVapidDetails(
  'mailto:getnirm@google.com',
  VPAID_KEYS.publicKey,
  VPAID_KEYS.privateKey
);


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

var jsonParser = bodyParser.json()

var pushSub = null

function responseOK(res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({'status': 'OK'}))
}


app.get('/ping', function (req, res) {
    console.log("PING REQUEST!")
    return res.send('pong');
});

app.get('/api/trigger-push', function(req, res) {
    webpush.sendNotification(pushSub.data, JSON.stringify({title: "hello from server :)"}))
    responseOK(res)
})

app.post('/api/save-push-sub', jsonParser, function(req, res) {
    const payload = req.body
    pushSub = payload//JSON.parse(payload)
    responseOK(res)
    console.log('STORED PUSH SUBSCRIPTION', pushSub)
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 7896;
app.listen(port, function() {
    console.log("webserver started on port " + port)
});
