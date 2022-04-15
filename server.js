const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/", { useNewUrlParser: true });

// db.HighScores.create({ name: "HeroEscape" })
//   .then(dbHighScores => {
//     console.log(dbHighScores);
//   })
//   .catch(({message}) => {
//     console.log(message);
//   });

  app.post("/scores", ({body}, res) => {
    db.Score.create(body)
      .then(({_id}) => db.HighScores.findOneAndUpdate( {}, { $push: { books: _id } }, { new: true }))
      .then(dbHighScores => {
        res.json(dbHighScores);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/scores/:level", (req, res) => {
    db.Score.find({level: req.params.level }).sort( {score:-1} )
      .then(dbBook => {
        res.json(dbBook);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.delete("/scores", (req, res) => {
    db.Score.findOneAndDelete({_id: req.body.id})
      .then(dbBook => {
        res.json(dbBook);
      })
      .catch(err => {
        res.json(err);
      });
  });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});