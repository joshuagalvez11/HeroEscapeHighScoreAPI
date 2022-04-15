const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  player: String,
  level: Number,
  score: Number
});

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
