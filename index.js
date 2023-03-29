const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Tweet = require("./Tweet");

mongoose.connect("mongodb://localhost/myTwitter");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/allTweets", async (req, res) => {
  const allTweets = await listAllTweets();
  res.json(allTweets);
});

app.post("/tweets", async (req, res) => {
  const tweet = await run(req.body.tweetContent);
  console.log(tweet)
  const allTweets = await listAllTweets();
  res.json(allTweets);
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});

async function run(tweetContent) {
  const tweet = await Tweet.create(tweetContent);
  await tweet.save();
  return tweet;
}

async function listAllTweets() {
  // list all posts
  const allPosts = await Tweet.find({});
  return allPosts;
}

