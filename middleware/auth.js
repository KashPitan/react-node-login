const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//gets jwtsecret value from env file
const jwtSecret = process.env.JWT_SECRET;

function auth(req, res, next) {
  //get token from request header
  const token = req.header("x-auth-token");

  //if token is not present in request header deny access
  if (!token) {
    return res.status(401).json({ msg: "Not logged in so no access" });
  }

  try {
    //decodes the jwt token
    const decodedToken = jwt.verify(token, jwtSecret);
    //sets the request user value to the decoded user object and passes
    //on to the next middleware function
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "The token is invalid" });
  }
}

module.exports = auth;
