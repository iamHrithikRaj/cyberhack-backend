//Imports
const router = require("express").Router();
import { BAD_REQUEST, OK } from "../constants/HttpStatus";
import auth from "../middlewares/Auth";
import { findById, find } from "../model/Team";

router.get("/rank", auth, async (req, res) => {
  let id = req.team._id;
  const team = await findById(id);
  if (!team)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  const teams = await find().sort({ score: -1 });
  const rank = teams.findIndex((t) => t._id == id);
  return res.status(OK).send({
    _id: team._id,
    rank: rank+1,
  });
});

export default router;
