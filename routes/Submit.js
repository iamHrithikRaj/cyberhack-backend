//Imports
const router = require("express").Router();
const http_status = require("../constants/http_status");
const auth = require("../middlewares/auth");
const Team = require("../model/team");

router.post("/submit", auth, async (req, res) => {
  // TODO: Implement answer checking and point incrementing logic
  let points = req.body.points;
  let id = req.team._id;
  const team = await Team.findById(id);
  if (!team)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  team.score += points;
  const updateTeam = await team.save();
  return res.status(http_status.OK).send({ score: updateTeam.score });
});

module.exports = router;
