const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//gets jwtsecret value from env file
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

function auth(req, res, next) {
  //get authorization header from request
  const header = req.header("Authorization");

  //header is "bearer [token]" so split string and take the second value from array
  const token = header && header.split(" ")[1];

  //with cookie parser implementation can also get cookies using...
  //const { accessToken, refreshToken } = req.cookies;

  console.log(req.cookies);

  //if token is not present in request header deny access
  if (token == null) {
    return res
      .status(403)
      .send({ errors: [{ msg: "Not logged in so no access" }] });
  }

  try {
    //decodes the jwt token
    const decodedToken = jwt.verify(token, jwtSecret);

    //sets the request user value to the decoded user object and passes
    //on to the next middleware function
    //user can now be accessed using req.user from route handling function
    req.user = decodedToken.user;
    req.token = token;
    next();
  } catch (err) {
    res.status(403).json({ msg: "The token is invalid" });
  }
}

function generateAccessToken(user) {
  console.log("test");
  return jwt.sign(user, jwtSecret, { expiresIn: 360000 });
}

function generateRefreshToken(user) {
  return jwt.sign(user, jwtRefreshSecret);
}

module.exports = { auth, generateAccessToken, generateRefreshToken };
