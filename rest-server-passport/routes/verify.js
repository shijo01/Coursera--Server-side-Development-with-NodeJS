/**
 * Created by shijo on 28/06/2017.
 */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('Not authenticated');
                err.status =401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        var err = new Error('No token found');
        err.status = 403;
        return next(err);
    }
};