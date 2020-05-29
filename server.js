const express = require("express");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const Uri = process.env.DB_CLOUD;
const localDB = process.env.DB_LOCAL;

const userOperationsRoutes = require("./routes/userOperationsRoutes");

const BodyParser = require("body-parser");

dotenv.config();
console.log(localDB);
console.log(process.env.PORT);

const MongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
};

mongoose
  .connect("mongodb://localhost/users", MongoOptions)
  .catch((err) => console.log(err));

const App = express();

//parse body of api routes
App.use(BodyParser.json());

//routes from routes folder
App.use("/user", userOperationsRoutes);

App.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT) {
    console.log(process.env.PORT);
  } else {
    console.log("listening on port 4000");
  }
});

module.exports = App;
