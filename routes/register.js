//Imports
const router = require("express").Router();
const Team = require("../model/Team");
const validateUser = require("../validation/validateUser");
const bcrypt = require("bcryptjs");
const http_status = require("../constants/http_status");

router.post("/register", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validateUser(req.body);
  if (error)
    return res.status(http_status.BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const teamExists = await Team.findOne({ teamName: value.teamName });
  if (teamExists)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A team with name ${value.teamName} already exists`);

  //Hash Password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  value.password = await bcrypt.hash(value.password, salt);

  try {
    const savedTeam = await new Team(value).save();
    return res.status(http_status.CREATED).send({
      id: savedTeam._id,
      teamName: savedTeam.teamName,
    });
  } catch (error) {
    return res.status(http_status.BAD_REQUEST).send(error);
  }
});

module.exports = router;
