var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});

app.get('/dishes', function (req, res, next) {
    res.end("Will send all the dishes for you!!");
});

app.post('/dishes', function (req, res, next) {
    res.end("Will add the dish: " + req.body.name + 'with details : ' + req.body.description);
});

app.delete('/dishes', function (req, res, next) {
    res.end("Deleting all dishes");
});

app.get('/dishes/:dishId', function (req, res, next) {
    res.end('Will send the dish with id ' + req.params.dishId + ' to you!!')
});

app.put('/dishes/:dishId', function (req, res, next) {
    res.write("Updating the dish with dishId " + req.params.dishId + "\n");
    res.end("Updated the dish " + req.body.name + ' with ' + req.body.description);
});

app.delete('/dishes/:dishId', function (req, res, next) {
    res.end("Deleting the dish with dishId " + req.params.dishId);
});

app.use(express.static(__dirname + "/public"));

app.listen(port, hostname, function () {
   console.log("Server running at http://" + hostname + ":" + port); 
});
