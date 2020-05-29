const mongoose = require("mongoose");
var mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//for mocha tests
before(function (done) {
  mongoose.connect("mongodb://localhost/test", mongoOptions);

  mongoose.connection
    .once("open", function () {
      console.log("PRE TEST: connection made");
      done();
    })
    .on("error", function (err) {
      console.log("PRE TEST: Connection Error: " + err);
    });
});

//clear collection before tests
beforeEach(function (done) {
  mongoose.connection.collections.users.drop(function () {
    console.log("PRE TEST: users collection has been dropped");
    done();
  });
});
