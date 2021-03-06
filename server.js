var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build/')));

app.get('/', (req, res) => {
    res.sendFille(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/data', (req, res) => {
    const data = {
        roll: req.body.roll,
        pitch: req.body.pitch,
        yaw: req.body.yaw,
        yAxis: req.body.yAxis
    };
    io.emit('data', data);
});

io.on('connection', socket => {
    console.log('new connection');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
});

