//Imports
const router = require("express").Router();
const http_status = require("../constants/http_status");
const auth = require("../middlewares/Auth");
const Team = require("../model/Team");
const Question = require("../model/question");
const { boolean } = require("joi");

router.post("/submit", auth, async (req, res) => {
  // TODO: Implement answer checking and point incrementing logic
  let question_id = req.body.id;
  let answer = req.body.answer;
  let id = req.team._id;
  const team = await Team.findById(id);
  if (!team)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A team with name ${value.teamName} doesn't exists`);
  const question = await Question.findById(question_id);
  if (!question)
    return res
      .status(http_status.BAD_REQUEST)
      .send(`A question with id ${question_id} doesn't exists`);
  if (answer == question.answer) {
    let solved = team.listOfSolvedQuestions.some(function (ques) {
      return ques.question_id === question_id;
    });
    if (solved === false) {
      team.totalScore += question.maxScore;
      team.listOfSolvedQuestions.push({
        question_id,
      });
      const updatedTeam = await team.save();
      return res.status(http_status.OK).send({ score: updatedTeam.totalScore });
    } else {
      return res
        .status(http_status.OK)
        .send({ error: "Question already solved" });
    }
  } else return res.status(http_status.OK).send({ error: "Incorrect Answer" });
});

module.exports = router;
