const jwt = require("jsonwebtoken");
const HttpStatus = require("../constants/HttpStatus");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(HttpStatus.BAD_REQUEST).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.team = decoded;
    next();
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).send("Invalid Token");
  }
};
