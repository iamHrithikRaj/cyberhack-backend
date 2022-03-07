//Imports
const router = require("express").Router();
const Team = require("../model/Team");
const validate = require("../validation/Validate");
const bcrypt = require("bcryptjs");
const HttpStatus = require("../constants/HttpStatus");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error)
    return res.status(HttpStatus.BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const team = await Team.findOne({ teamName: value.teamName });
  if (!team)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);

  const validPassword = await bcrypt.compare(value.password, team.password);
  if (!validPassword)
    return res.status(HttpStatus.BAD_REQUEST).send(`Incorrect password`);

  //Create and assing a token
  const token = jwt.sign({ _id: team._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", token).send(token);
});

module.exports = router;
