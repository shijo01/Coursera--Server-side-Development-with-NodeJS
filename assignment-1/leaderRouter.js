var express = require('express');
var bodyParser = require('body-parser');


var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end("Will send all the leaders for you!!");
    })
    .post(function (req, res, next) {
        res.end("Will add the leaders : " + req.body.name + ' with details : ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting all leaders");
});

leaderRouter.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send the leader with id ' + req.params.id + ' to you!!');
    })
    .put(function (req, res, next) {
        res.write("Updating the leader with leaderId " + req.params.id + "\n");
        res.end("Updated the leader " + req.body.name + ' with ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting the leader with leaderId " + req.params.id);
});


module.exports = leaderRouter;   