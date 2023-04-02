const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Tweet = require("./Tweet");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/myTwitter");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

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
  const allTweets = await listAllTweets();
  res.json(allTweets);
});

app.patch("/tweets", async (req, res) => {
  let tweet = await Tweet.findOneAndUpdate(
    { _id: req.body.data.id },
    { tweetText: req.body.data.text }
  );
console.log(tweet)
  res.json(tweet)
});

app.delete("/tweets", async (req, res) => {
  await Tweet.deleteOne({ _id: req.body.id });
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
