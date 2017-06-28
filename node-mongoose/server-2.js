var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function () {
    console.log("Connected to db");
    
    Dishes.create({
        name: "Pizza pizza",
        description: "New Pizza"
    }, function (err, dish) {
        if (err) throw err;
        
        console.log('Dish created');
        console.log(dish);
        
        var id = dish._id;
        
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Old pizza"
                }
            }, {
                new: true
            })
            .exec(function (err, dish) {
                if (err) throw err;
                console.log('Updated dish');
                console.log(dish);
                
                db.collection('dishes').drop(function () {
                    db.close();
                }); 
                
            });
            
        }, 3000);
    });
    
});