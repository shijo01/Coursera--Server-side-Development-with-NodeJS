var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser')
var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345678900987654321'));

function auth (req, res, next) {
    console.log(req.headers);
    
    if (!req.signedCookies.user) {
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
                res.cookie('user', 'admin', {signed: true});
                next()
            } else{
                var err = new Error("Unauthorized");
                err.status = 401;
                next(err);
            }
        }
    } else {
        if (req.signedCookies.user === 'admin') {
            console.log(req.signedCookies);
            next();
        } else {
            var err = new Error('Not authenticated user');
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
