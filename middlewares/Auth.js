const jwt = require("jsonwebtoken");
const HttpRequest = require("../constants/HttpRequest");

const auth = (res, req, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(HttpRequest.BAD_REQUEST).send("Access Denied");

  try {
    const verifed = jwt.verify(token, process.env.TOKEN_SECRET);
    req.team = verifed;
  } catch (error) {
    return res.status(HttpRequest.BAD_REQUEST).send("Invalid Token");
  }
};
