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
  
  const tweets = await listTweets();
  console.log("calling GET function");
  res.json(tweets);

});

app.post("/tweets", async (req, res) => {
  const tweet = await run(req.body.tweetContent);
  const tweets = await listTweets();
  console.log("calling POST function");
  res.json(tweets);
});

app.patch("/tweets", async (req, res) => {
  let tweet = await Tweet.findOneAndUpdate(
    { _id: req.body.data.id },
    { tweetText: req.body.data.text }
  );
  res.json(tweet)
});

app.delete("/tweets", async (req, res) => {
  await Tweet.deleteOne({ _id: req.body.id });
  const tweets = await listTweets();
  res.json(tweets);
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});

async function run(tweetContent) {
  const tweet = await Tweet.create(tweetContent);
  await tweet.save();
  return tweet;
}

async function listTweets(page) {
  const resTweets = await Tweet.find({}).sort({ timestamp: -1 }).limit(30);

  // list all posts
  // const allPosts = await Tweet.find({});

  // Pagination
  const tweetsPerPage = 3
  const pageTweets = await Tweet.find({}).sort({ timestamp: -1 }).skip(page * tweetsPerPage).limit(tweetsPerPage);

  return pageTweets;
}
