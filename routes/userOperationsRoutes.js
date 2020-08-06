const Express = require("express");
const User = require("../models/UserModel");
const Router = Express.Router();
const jwt = require("jsonwebtoken");
const { check, body, validationResult } = require("express-validator");
const Bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const auth = require("../middleware/auth");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
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
  async (req, res, next) => {
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
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err);
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
  async (req, res, next) => {
    const errors = validationResult(req);
    //if there are errors return error array
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      //checks to see if the user with the input email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Account with entered email does not exist" });
      }
      //checks if the password entered matches the user found
      let passwordMatch = Bcrypt.compareSync(password, user.password);

      //if the password matches create the jwt
      if (passwordMatch) {
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
      } else {
        return res.status(400).json({ msg: "Password is incorrect" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  }
);

module.exports = Router;
