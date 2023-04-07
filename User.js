const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "User",
  },
  avatar: {
    type: String,
    default: "https://s3.amazonaws.com/kd4/unsystem",
  },
});

module.exports = mongoose.model("User", userSchema);