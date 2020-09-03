const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Uri = process.env.DB_CLOUD;
const localDB = process.env.DB_LOCAL;

const userRoutes = require("./routes/userRoutes");

const BodyParser = require("body-parser");

console.log(localDB);
console.log(process.env.PORT);

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
};

mongoose.connect(localDB, MongoOptions).catch((err) => console.log(err));

const App = express();

//parse body of api routes
App.use(BodyParser.json());

//routes from routes folder
App.use("/user", userRoutes);

App.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT) {
    console.log(process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

module.exports = App;
