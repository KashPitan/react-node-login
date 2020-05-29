const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

UserSchema.methods = {
  passwordCheck: function (password) {
    return Bcrypt.compareSync(password, this.password);
  },

  /*this method is used to hash the password using bcrypt
    first param is the password in plain text to hash, 
    second param is the "salt length" to generate*/
  passwordHash: (plainText) => {
    return Bcrypt.hashSync(plainText, 10);
  },
};

UserSchema.pre("save", function (next) {
  //if there is no password
  if (!this.password) {
    // console.log("usermodel: password required");
    next();
  } else {
    //if a password is provided is calls the hash method
    // console.log("password hash in pre save");
    this.password = this.passwordHash(this.password);
    next();
  }
});

const UserModel = Mongoose.model("user", UserSchema);

module.exports = UserModel;
