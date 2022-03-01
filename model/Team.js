const mongoose = require("mongoose");

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
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Team", teamSchema);
