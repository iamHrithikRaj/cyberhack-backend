//Imports
const router = require("express").Router();
const Team = require("../model/Team");
const validate = require("../validation/validate");
const bcrypt = require("bcryptjs");

//Status Codes
const CREATED = 201;
const BAD_REQUEST = 400;

router.post("/login", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const team = await Team.findOne({ teamName: value.teamName });
  if (!team)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);

  const validPassword = await bcrypt.compare(value.password, team.password);
  if (!validPassword) return res.status(BAD_REQUEST).send(`Incorrect password`);

  return res.send("Success");
});

module.exports = router;
