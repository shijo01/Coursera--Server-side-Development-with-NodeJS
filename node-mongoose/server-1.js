var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function () {
    console.log("Connected to db");
    
    var newDish = Dishes( {
        name: 'Pizza pizza',
        description: 'New pizza'
    });
    
    newDish.save(function (err) {
        if (err) throw err;
        
        console.log("Dish inserted");
        
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;
            
            console.log(dishes);
            
            db.collection('dishes').drop(function (err) {
                if (err) throw err;
                db.close();
            });
        });
    });
});