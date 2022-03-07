//Imports
const router = require("express").Router();
import { BAD_REQUEST, OK } from "../constants/HttpStatus";
import auth from "../middlewares/Auth";
import { findById } from "../model/Team";

router.post("/submit", auth, async (req, res) => {
  // TODO: Implement answer checking and point incrementing logic
  let points = req.body.points;
  let id = req.team._id;
  const team = await findById(id);
  if (!team)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  team.score += points;
  const updateTeam = await team.save();
  return res.status(OK).send({score : updateTeam.score});
});

export default router;
