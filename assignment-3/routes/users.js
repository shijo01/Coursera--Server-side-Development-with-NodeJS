var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var bodyParser = require('body-parser');
var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
    .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.status(500).json({
                    status: "Failed",
                    error: err
                });
                return;
            } else {
                res.status(200).json({
                    users: users
                });
            }
        });
    });


userRouter.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password,
        function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }

            passport.authenticate('local')(req, res, function () {
                res.status(200).json({status: 'Registration success!'});
            });
        });
});

userRouter.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not login'
                });
            }

            console.log('User in users: ', user);
            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

userRouter.get('/logout', function (req, res) {
    req.logOut();
    res.status(200).json({
        status: 'Success'
    });
});

module.exports = userRouter;
