const Express = require("express");
const User = require("../models/UserModel");
const Router = Express.Router();
const jwt = require("jsonwebtoken");
const { check, body, validationResult } = require("express-validator");

//when the user registers
Router.post(
  "/register",
  [
    check("username", "Username required").not().isEmpty(),
    check("email", "Include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with at least 6 characters"
    ).isLength({ min: 6 }),
  ],
  async function (req, res, next) {
    //store error messages in array
    const errors = validationResult(req);

    //if there are errors return error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Account already exists" });
      }

      //creates a user if the details given are valid
      user = await User.create(req.body);
      let payload = {
        user: {
          id: user.id,
        },
      };

      //create token with 1 hour expiration
      jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("Error");
    }
  }
);

Router.post(
  "/login",
  [
    check("email", "Please enter an email").notEmpty(),
    check("password", "Please enter password").notEmpty(),
  ],
  function (req, res, next) {
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
  }
);

module.exports = Router;
