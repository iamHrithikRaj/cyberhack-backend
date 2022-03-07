//Imports
const router = require("express").Router();
const HttpStatus = require("../constants/HttpStatus");
const auth = require("../middlewares/Auth");
const Team = require("../model/Team");

router.get("/rank", auth, async (req, res) => {
  let id = req.team._id;
  const team = await Team.findById(id);
  if (!team)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  const teams = await Team.find().sort({ score: -1 });
  const rank = teams.findIndex((t) => t._id == id);
  return res.status(HttpStatus.OK).send({
    _id: team._id,
    rank: rank+1,
  });
});

module.exports = router;
