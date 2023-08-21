const commentsModel = require("../models/comments");
const articlesModel = require("../models/articles");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const userName = req.token.author
  const newComment = new commentsModel({
    comment,
    commenter,
    userName
  });
  newComment
    .save()
    .then((result) => {
      articlesModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createNewComment,
};
