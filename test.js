var MongoClient = require("mongodb").MongoClient;
console.log("hiiii");
mongoClient.connect("mongodb://localhost/testdb", function(error, db) {
    if (error) throw error;

    db.collection("cliens").find().toArray(function (error, results) {
        if (error) throw error;

    alert(results);
    });
});