//Imports
const router = require("express").Router();
const http_status = require("../constants/http_status");
const auth = require("../middlewares/auth");
const Team = require("../model/team");

router.get("/rank", auth, async (req, res) => {
  let id = req.team._id;
  const team = await Team.findById(id);
  if (!team)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  const teams = await Team.find().sort({ score: -1 });
  const rank = teams.findIndex((t) => t.teamName == team.teamName);
  return res.status(http_status.OK).send({
    _id: team._id,
    rank: rank + 1,
  });
});

module.exports = router;
