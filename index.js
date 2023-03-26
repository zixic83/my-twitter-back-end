const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const Tweet = require('./Tweet');

mongoose.connect("mongodb://localhost/myTwitter");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        messsage:'Hello user! :)'
    })
})

app.post('/tweets', async (req, res) => {
  //console.log(req.body.tweetContent) = { tweetText: 'Testing tweets', tweetMedia: 'www.twitter.com' }
  const tweet = await run(req.body.tweetContent);
  res.json(tweet);
})

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})

async function run(tweetContent) {
    const tweet = new Tweet(tweetContent)
    await tweet.save()
    return tweet
}