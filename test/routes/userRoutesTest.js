const User = require("../../models/UserModel");
const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const app = require("../../server");

describe("TEST GROUP: Registering a user", function () {
  //test adding user to users collection
  it("TEST UNIT: Register a user with valid details", function (done) {
    //creating a user object mimicking what would be passed from the front end
    var kash = {
      username: "kashp",
      password: "kashp123",
      passwordConfirm: "kashp123",
      email: "kashpitan@testmail.com",
    };

    chai
      .request(app)
      .post("/user/register")
      .send(kash)
      .then((res) => {
        //search for user in database to ensure it has been added
        User.findOne({ username: kash.username, email: kash.email }).then(
          (user) => {
            //verify that the details added for the user found are correct
            assert(kash.email === user.email, "user email is not correct");
            assert(
              kash.username === user.username,
              "user username is not correct"
            );
            done();
          }
        );
      });
  });
});

describe("TEST GROUP: Logging in", function () {
  it("TEST UNIT: Login a user with valid details", function (done) {
    //post request object for registration
    let kash = {
      username: "kashp",
      password: "kashp123",
      passwordConfirm: "kashp123",
      email: "kashpitan@testmail.com",
    };

    //post request object for login
    let kashLogin = {
      email: "kashpitan@testmail.com",
      password: "kashp123",
    };

    //register user kash
    chai
      .request(app)
      .post("/user/register")
      .send(kash)
      .then((res) => {
        chai
          .request(app)
          .post("/user/login")
          .send(kashLogin)
          .then((res) => {
            console.log(res.body);
            assert(res.body === true);
            done();
          });
      });
  });

  it("TEST UNIT: Login a user with invalid details", function (done) {
    //post request object for registration
    let kash = {
      username: "kashp",
      password: "kashp123",
      passwordConfirm: "kashp123",
      email: "kashpitan@testmail.com",
    };

    //post request object for login
    let kashLogin = {
      email: "kashpitan@testmail.com",
      password: "wrongpassword",
    };

    //register user kash
    chai
      .request(app)
      .post("/user/register")
      .send(kash)
      .then((res) => {
        chai
          .request(app)
          .post("/user/login")
          .send(kashLogin)
          .then((res) => {
            console.log(res.body);
            assert(res.body === "password is incorrect");
            done();
          });
      });
  });
});
