var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({'time': req.time});
});

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    };
});

app.get('/:word/echo', (req, res) => {
    res.json({'echo': req.params.word});
});

app
    .route('/name')
    .get((req, res) => {
        res.json({'name': req.query.first+' '+req.query.last});
    })
    .post((req, res) => {
        res.json({'name': req.body.first+' '+req.body.last});
    });







































 module.exports = app;
