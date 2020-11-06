const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

var jsonParser = bodyParser.json()

var pushSub = null


app.get('/ping', function (req, res) {
    console.log("PING REQUEST!")
    return res.send('pong');
});

app.post('/api/save-push-sub', jsonParser, function(req, res) {
    const payload = req.body
    pushSub = payload//JSON.parse(payload)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({'status': 'OK'}))
    console.log('STORED PUSH SUBSCRIPTION', pushSub)
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 7896;
app.listen(port, function() {
    console.log("webserver started on port " + port)
});
