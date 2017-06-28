var express = require('express');
var http = require('http');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(function (req, res, next) {
    console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body><h1>Hello express world!!</h1></body></html>');
});

var server = http.createServer(app);
server.listen(port, hostname, function(){
   console.log("Server running at http://"+hostname+":"+port+"/"); 
});