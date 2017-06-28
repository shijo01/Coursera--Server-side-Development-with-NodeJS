var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(morgan('dev'));

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    
    if(!authHeader) {
        var err = new Error("Unauthorized");
        err.status = 401;
        next(err);
    } else{
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        
        var user = auth[0];
        var password = auth[1];
        
        if (user == 'admin' && password == 'password') {
            next()
        } else{
            var err = new Error("Unauthorized");
            err.status = 401;
            next(err);
        }
    }
    
    return;
}

app.use(auth);

app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/palin'
    });
    res.end(err.message);
});

app.use(express.static(__dirname + "/public"));

app.listen(port, hostname, function(){
   console.log("Server running at http://"+ hostname + ":"+port); 
});
