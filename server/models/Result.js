const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: String,
  score: Number,
  totalQuestions: Number
});

module.exports = mongoose.model("Result", resultSchema);