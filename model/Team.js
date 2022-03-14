const mongoose = require("mongoose");

const listOfSolvedQuestionsSchema = new mongoose.Schema({
  question_id: {
      type: String,
      required: true
  },
  timestamp : {
      type: Date,
      required: false,
      default: Date.now
  }
})

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  totalScore: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  listOfSolvedQuestions:[
    listOfSolvedQuestionsSchema
  ]
});

module.exports = mongoose.model("Team", teamSchema);
