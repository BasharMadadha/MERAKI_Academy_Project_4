const articlesModel = require("../models/articles");

// This function add a likes for a specific article
const addLike = (req, res) => {
  const articleId = req.params.articleId;
  const userId = req.token.userId;

  articlesModel
    .findById(articleId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      } else if (result.likes.find((like) => like.user.toString() === userId)) {
        return res.status(400).json({
          success: false,
          message: "You have already liked this article",
        });
      } else {
        result.likes.push({ user: userId});
        result.save();
        res.status(201).json({
          success: true,
          message: "Like added",
          liked: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const deleteLikesById = (req, res) => {
  const articleId = req.params.articleId;
  const userId = req.token.userId;

  articlesModel
  .findById(articleId)
  .then(async (article) => {
    if (!article) {
      return res.status(404).json({
        success: false,
        message: `The article with id => ${articleId} not found`,
      });
    }
    // Find the index of the like made by the specific user
    const likeIndex = article.likes.findIndex(like => like.user.toString() === userId);

    if (likeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Like not found for the user`,
      });
    }
    // Remove the user's like from the likes array
    article.likes.splice(likeIndex, 1);
    // Save the modified article
    await article.save();

    res.status(200).json({
      success: true,
      message: `Like deleted for the user`,
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
  addLike,
  deleteLikesById
};
