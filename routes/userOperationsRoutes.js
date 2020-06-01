const Express = require("express");
const User = require("../models/UserModel");
const Router = Express.Router();
const jwt = require("jsonwebtoken");

//when the user registers
Router.post("/register", function (req, res, next) {
  // console.log(req.body);

  //store error messages
  registrationValidity = isRegistrationDetailsValid(req.body);
  if (registrationValidity === true) {
    //creates a user if the details given are valid
    User.create(req.body)
      .then(function (user) {})
      .catch(next);
    res.send(true);
  } else {
    //print out errors if user details are not valid
    // console.log(registrationValidity);
    res.send(false);
  }
});

Router.post("/login", function (req, res, next) {
  console.log(req.body);

  //query database for user with email entered
  User.findOne({ email: req.body.email }).then((user) => {
    //return false if the query above doesnt find a user
    if (!user) {
      res.send({ message: "user does not exist" });
    }
    // if the password is incorrect
    if (!user.passwordCheck(req.body.password)) {
      res.send({ message: "password is incorrect" });
    }
    //if the password is correct send true
    res.send(true);
  });
});

//checks to ensure that the users registration details are valid
function isRegistrationDetailsValid(registrationDetails) {
  var errors = [];

  //passwords do not match
  if (registrationDetails.password !== registrationDetails.passwordConfirm) {
    // console.log("passwords do not match");
    errors.push("passwords do not match");
  }
  //password is less than 6 characters
  if (registrationDetails.password.length < 6) {
    // console.log("password must be at least 6 characters long");
    errors.push("password must be at least 6 characters long");
  }

  //check if username already exists
  User.findOne({ username: registrationDetails.username }).then(function (
    user
  ) {
    if (user) {
      //if there is a result then the user
      errors.push("username is already taken");
    }
  });

  //check if email already exists
  User.findOne({ email: registrationDetails.email }).then(function (user) {
    if (user) {
      //if there is a result then the user
      errors.push("email is already in use");
    }
  });

  if (errors.length > 0) {
    return errors;
  } else {
    return true;
  }
}

module.exports = Router;
