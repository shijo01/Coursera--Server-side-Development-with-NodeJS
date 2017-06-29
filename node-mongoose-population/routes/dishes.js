/**
 * Created by shijo on 14/06/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function (err, dishes) {
                if (err) throw err;
                res.json(dishes);
            });
    })
    .post(Verify.verifyAdmin, function (req, res, next) {
        Dishes.create(req.body, function (err, dish) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                })
            }
            ;
            console.log('Dish created');

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added a new dish with id :' + dish._id);

        });
    })
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.remove({}, function (err, response) {
            if (err) {
                res.status(500).json({
                    status: 'Failed',
                    error: err
                });
                return;
            }
            res.json(response);
        });
    });

dishRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Dishes.findById(req.params.id)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) throw err;
                res.json(dish);
            });
    })
    .put(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.id, function (err, response) {
            if (err) throw err;
            res.json(response);
        });
    });

dishRouter.route('/:id/comments')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Dishes.findById(req.params.id)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) throw err;
                res.json(dish.comments);
            });
    })
    .post(function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (err) res.json(err);

            req.body.postedBy = req.decoded._doc._id;

            dish.comments.push(req.body);

            dish.save(function (err, dish) {
                if (err) res.json(err);
                console.log("Dish updated");
                res.json(dish);
            });

        });
    })
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (err) res.json(err);

            var len = dish.comments.length;
            for (var i = 0; i < len; i++) {
                dish.comments.id(dish.comments[i]._id).remove();
            }

            dish.save(function (err, response) {
                if (err) res.json(err);

                res.writeHead(200, {'content-Type': 'text/plain'});
                res.end('All comments removed ' + response);
            })
        })
    });

dishRouter.route('/:id/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Dishes.findById(req.params.id)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) throw err;
                res.json(dish.comments.id(req.params.commentId));
            });
    })
    .put(function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            req.body.postedBy = req.decoded._doc._id;
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            });
        });
    })
    .delete(function (req, res, next) {
        Dishes.findById(req.params.id, function (err, dish) {
            if (dish.comments.id(req.params.commenId).postedBy != req.decoded._doc._id) {
                var err = new Error("You are not allowed to delete others comments");
                err.status = 403;
                return next(err);
            }
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });


module.exports = dishRouter;