const articlesModel = require("../models/articles");
const usersModel = require("../models/users"); 

// This function add a likes for a specific article
const addLike = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.token.userId;
    const userName = req.token.author;
    const userPic = req.token.authorPic;

    const article = await articlesModel.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    } else if (article.likes.find((like) => like.user.toString() === userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this article",
      });
    } else {
      // Update the article's likes
      article.likes.push({
        user: userId,
        userName: userName,
        userPic: userPic,
      });

      // Save the updated article
      await article.save();

      // Find the user who wrote the article
      const user = await usersModel.findById(article.author);

      if (user) {
        // Add the liker's information to the user's notifications
        user.notifications.push({
          user: userId,
          userName: userName,
          userPic: userPic,
          stat : "Like your post",
          mess : "— You've got a new like. Keep up the great work!"
        });

        // Save the updated user document
        await user.save();
      }

      res.status(201).json({
        success: true,
        message: "Like added",
        liked: article.likes,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const deleteLikesById = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const userId = req.token.userId;

    const article = await articlesModel.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `The article with id => ${articleId} not found`,
      });
    }

    // Find the index of the like made by the specific user
    const likeIndex = article.likes.findIndex((like) => like.user.toString() === userId);

    if (likeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Like not found for the user`,
      });
    }

    // Remove the user's like from the likes array
    article.likes.splice(likeIndex, 1);

    // Find the user who originally liked the article
    const likedUser = await usersModel.findById(userId);

    if (likedUser) {
      // Find and remove the notification associated with the like being deleted
      const notificationIndex = likedUser.notifications.findIndex(
        (notification) => notification.user.toString() === article.author.toString()
      );

      if (notificationIndex !== -1) {
        likedUser.notifications.splice(notificationIndex, 1);
        await likedUser.save();
      }
    }

    // Save the modified article
    await article.save();

    res.status(200).json({
      success: true,
      message: `Like deleted for the user`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};


module.exports = {
  addLike,
  deleteLikesById,
};
