//Imports
const router = require("express").Router();
const HttpRequest = require("../constants/HttpRequest");
const auth = require("../middlewares/Auth")

router.post("/submit", auth, (req, res) => {
  return res.status(HttpRequest.OK).send(req.team);

  // TODO: Implement answer checking and point incrementing logic
});

module.exports = router;
