var express = require('express');
var bodyParser = require('body-parser');


var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end("Will send all the promotion for you!!");
    })
    .post(function (req, res, next) {
        res.end("Will add the promotion : " + req.body.name + ' with details : ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting all promotions");
});

promoRouter.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send the promotion with id ' + req.params.id + ' to you!!');
    })
    .put(function (req, res, next) {
        res.write("Updating the promotion with promoId " + req.params.id + "\n");
        res.end("Updated the promotion " + req.body.name + ' with ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting the promotion with promoId " + req.params.id);
});


module.exports = promoRouter;   