//Imports
const router = require("express").Router();
import { findOne } from "../model/Team";
import validate from "../validation/Validate";
import { compare } from "bcryptjs";
import { BAD_REQUEST } from "../constants/HttpStatus";
import { sign } from "jsonwebtoken";

router.post("/login", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validate(req.body);
  if (error)
    return res.status(BAD_REQUEST).send(error.details[0].message);

  //Check if a team with same name exists
  const team = await findOne({ teamName: value.teamName });
  if (!team)
    return res
      .status(BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);

  const validPassword = await compare(value.password, team.password);
  if (!validPassword)
    return res.status(BAD_REQUEST).send(`Incorrect password`);

  //Create and assing a token
  const token = sign({ _id: team._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", token).send(token);
});

export default router;
