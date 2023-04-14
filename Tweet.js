const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  tweetText: String,
  tweetMedia: String,
  photoArray:[{type:String}],
  tweetVideo: String,
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  Liked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tweet", tweetSchema);
