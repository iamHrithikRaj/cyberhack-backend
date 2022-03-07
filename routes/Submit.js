//Imports
const router = require("express").Router();
const HttpStatus = require("../constants/HttpStatus");
const auth = require("../middlewares/Auth");
const Team = require("../model/Team");

router.post("/submit", auth, async (req, res) => {
  // TODO: Implement answer checking and point incrementing logic
  let points = req.body.points;
  let id = req.team._id;
  const team = await Team.findById(id);
  if (!team)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  team.score += points;
  const updateTeam = await team.save();
  return res.status(HttpStatus.OK).send({score : updateTeam.score});
});

module.exports = router;
