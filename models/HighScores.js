const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HighScoresSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  score: [
    {
      type: Schema.Types.ObjectId,
      ref: "Score"
    }
  ]
});

const HighScores = mongoose.model("HighScores", HighScoresSchema);

module.exports = HighScores;
