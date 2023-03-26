const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
    tweetText: String,
    tweetMedia: String
})

module.exports = mongoose.model("Tweet",tweetSchema)