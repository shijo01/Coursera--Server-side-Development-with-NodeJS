var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');

var url = 'mongodb://localhost:27017/assignment2db';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function () {
    console.log("Connected to db");
    
    Dishes.create({
        name: "Pizza pizza",
        image: "images/uthapizza.png",
        category: "mains",
        price: "$4.99",
        description: "New Pizza",
        comments: [
            {
                rating: 4,
                comment: 'Good',
                author: 'Shijo'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        
        console.log('Dish created');
        console.log(dish);
        
        var id = dish._id;
        
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Old pizza",
                    label : 'Hot'
                }
            }, {
                new: true
            })
            .exec(function (err, dish) {
                if (err) throw err;
                console.log('Updated dish');
                console.log(dish);
                
                dish.comments.push({
                    rating: 5,
                    comment: 'Very good',
                    author: 'Sharath'
                });
                
                dish.save(function (err, dish) {
                    if (err) throw err;
                    console.log("Updated comment\n" + dish);
                    
                    db.collection('dishes').drop(function () {
                        db.close();
                        });
                    });
                });
            
        }, 1000);
    });
    
});

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function() {
    Promotions.create({
        name: "Weekend Grand Buffet",
        image: "images/buffet.png",
        label: "New",
        price: "19.99",
        description: "Featuring . . ."
    }, function (err, promo) {
        if (err) throw err;
        
        console.log("Promotion created");
        console.log(promo);
        
        var id = promo._id;
        
        Promotions.findByIdAndUpdate(id, {
            $set: {
                price: "$21.99"
            }
        }, {
            new: true
        })
        .exec(function (err, promo) {
            if (err) throw err;
            console.log("Price updated");
            console.log("New price: " + promo.price.toFixed(2));
            
            db.collection('promotions').drop( function () {
               db.close(); 
            });
        });
        
    });
});

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', function () {
    Leaders.create({
        name: "Peter Pan",
        image: "images/alberto.png",
        designation: "Chief Epicurious Officer",
        abbr: "CEO",
        description: "Our CEO, Peter, . . ."
    }, function (err, leader) {
        if (err) throw err;
        console.log("Leader created");
        console.log(leader);
        var leaderId = leader._id;
        
        leader.name = 'Peter Jain';
        leader.save(function (err) {
            if(err) throw err;
            console.log('Leader updated');
            
            Leaders.findById(leaderId, function (err, leader) {
               if (err) throw err;
                console.log(leader);
                
                db.collection('leaders').drop( function () {
                   db.close(); 
                });
            }); 
        });
        
    });
})