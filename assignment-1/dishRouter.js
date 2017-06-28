var express = require('express');
var bodyParser = require('body-parser');


var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end("Will send all the dishes for you!!");
    })
    .post(function (req, res, next) {
        res.end("Will add the dish: " + req.body.name + ' with details : ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting all dishes");
});

dishRouter.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send the dish with id ' + req.params.id + ' to you!!');
    })
    .put(function (req, res, next) {
        res.write("Updating the dish with dishId " + req.params.id + "\n");
        res.end("Updated the dish " + req.body.name + ' with ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting the dish with dishId " + req.params.id);
});


module.exports = dishRouter;    