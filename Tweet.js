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

// updatedAt
//https://medium.com/@iamlittlerock/auto-generated-createdat-and-updatedat-fields-in-mongodb-86bb5980be2
tweetSchema.set('timestamps',true)

module.exports = mongoose.model("Tweet", tweetSchema);
