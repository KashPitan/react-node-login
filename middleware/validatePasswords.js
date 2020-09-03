const { body } = require("express-validator");

module.exports = validatePasswords = body("password").custom(
  (value, { req }) => {
    if (value !== req.body.passwordConfirm) {
      throw new Error("Passwords don't match");
    }
    return true;
  }
);
