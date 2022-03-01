//Imports
const router = require("express").Router();
const Team = require("../model/Team");
const validate = require("../validation/validate");
const bcrypt = require("bcryptjs");

//Status Codes
const CREATED = 201;
const BAD_REQUEST = 400;

router.post("/register", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const teamExists = await Team.findOne({ teamName: value.teamName });
  if (teamExists)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} already exists`);

  //Hash Password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  value.password = await bcrypt.hash(value.password, salt);

  try {
    const savedTeam = await new Team(value).save();
    return res.status(CREATED).send({
      id: savedTeam._id,
      teamName: savedTeam.teamName,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});


module.exports = router;
