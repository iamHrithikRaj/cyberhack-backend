//Imports
const router = require("express").Router();
import Team, { findOne } from "../model/Team";
import validate from "../validation/Validate";
import { genSalt, hash } from "bcryptjs";
import { BAD_REQUEST, CREATED } from "../constants/HttpStatus";

router.post("/register", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error)
    return res.status(BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const teamExists = await findOne({ teamName: value.teamName });
  if (teamExists)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} already exists`);

  //Hash Password
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  value.password = await hash(value.password, salt);

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

export default router;
