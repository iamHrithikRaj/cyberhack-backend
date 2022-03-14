const { required } = require("joi");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  problemStatement: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  maxScore: {
    type: Number,
    required: true,
    default: 0,
  }
 
});

module.exports = mongoose.model("Question", questionSchema);
