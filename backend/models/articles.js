const mongoose = require("mongoose");

const articles = new mongoose.Schema({
  description: { type: String, required: true },
  userName: { type: String },
  pic: { type: String },
  articleDate: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Articles", articles);
