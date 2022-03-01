const jwt = require("jsonwebtoken");
const HttpRequest = require("../constants/HttpRequest");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(HttpRequest.BAD_REQUEST).send("Access Denied");

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(HttpRequest.BAD_REQUEST).send("Invalid Token");
    req.team = decoded;
  });
  next();
};
