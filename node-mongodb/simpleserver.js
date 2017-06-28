var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/mydb';
mongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log('Connected to database server');
    
    var collection = db.collection("dishes");
    
    collection.insertOne({name: "Biriyani", desc: " Chicken biriyani"}, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted a document");
        console.log(result.ops);
        
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Items :");
            console.log(docs);
            
            db.dropCollection('dishes', function (err, result) {
                assert.equal(err, null);
                db.close();
                console.log("Deleted everything and connection closed!");
            });
        });
    });
});