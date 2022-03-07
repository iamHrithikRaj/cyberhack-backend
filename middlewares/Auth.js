const jwt = require("jsonwebtoken");
const http_status = require("../constants/http_status");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(http_status.BAD_REQUEST).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.team = decoded;
    next();
  } catch (error) {
    return res.status(http_status.BAD_REQUEST).send("Invalid Token");
  }
};
