//Imports
const router = require("express").Router();
const HttpRequest = require("../constants/HttpRequest");

router.post("/submit", (req, res) => {
  res.status(HttpRequest.OK).send("OK");

  // TODO: Implement answer checking and point incrementing logic
});

module.exports = router;
