const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  tweetText: String,
  tweetMedia: String,
  tweetVideo: String,
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Tweet", tweetSchema);
