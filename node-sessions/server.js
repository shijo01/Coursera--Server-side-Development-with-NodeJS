var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(session({
    name: 'session-id',
    secret: '1234567890-0987654321',
    saveUninitialized: true,
    resave: true,
    store : new FileStore()
}));

function auth(req, res, next) {
    console.log(req.headers);
    var err;

    if (!req.session.user) {
        var authHeader = req.headers.authorization;

        if (!authHeader) {
            err = new Error("Unauthorized");
            err.status = 401;
            next(err);
        } else {
            var authUser = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

            var user = authUser[0];
            var password = authUser[1];

            if (user == 'admin' && password == 'password') {
                req.session.user = 'admin';
                next();
            } else {
                err = new Error("Unauthorized");
                err.status = 401;
                next(err);
            }
        }
    } else {
        if (req.session.user === 'admin') {
            console.log('req.session: ', req.session);
            next();
        } else {
            err = new Error('Not authenticated user');
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

app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port);
});
