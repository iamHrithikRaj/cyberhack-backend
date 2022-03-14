//Imports
const router = require("express").Router();
const Question = require("../model/question");
const validateQuestion = require("../validation/validateQuestion");
const bcrypt = require("bcryptjs");
const http_status = require("../constants/http_status");

router.post("/add_question", async (req, res) => {
  //Validate the incoming request body
  const { error, value } = validateQuestion(req.body);
  if (error)
    return res.status(http_status.BAD_REQUEST).send(error.details[0].message);

  try {
    const savedQuestion = await new Question(value).save();
    return res.status(http_status.CREATED).send({
      id: savedQuestion._id,
      problemStatement: savedQuestion.problemStatement,
    });
  } catch (error) {
    return res.status(http_status.BAD_REQUEST).send(error);
  }
});

module.exports = router;
