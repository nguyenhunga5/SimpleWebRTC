

const fs = require('fs');
const express = require('express');
const https = require('https');

const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem')
};

var app = express();
app.use(express.static(__dirname + '/out'));
var server = https.createServer(options, app);

const io = require('socket.io').listen(server);
server.listen(8089, function () {
    console.log('Listening on localhost:8089');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test/index.html');
})

io.on('connection', function (socket) {

    console.log('Client connected: ', socket);

});

io.on('disconnect', function (socket) {

    console.log('Client disconnected: ', socket);

});