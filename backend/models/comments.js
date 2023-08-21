const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userName: { type: String },
  commentDate: { type: Date, default: Date.now },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
