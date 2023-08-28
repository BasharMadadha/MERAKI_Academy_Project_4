const articlesModel = require("../models/articles");

// This function returns the articles
const getAllArticles = (req, res) => {
  const userId = req.token.userId;
  articlesModel
    .find()
    .populate("comments")
    .populate("likes")
    .exec()
    .then((articles) => {
      if (articles.length) {
        res.status(200).json({
          success: true,
          message: `All the articles`,
          userId: userId,
          articles: articles,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Articles Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//This function returns articles by author
const getArticlesByAuthor = (req, res) => {
  let authorId = req.query.author;

  articlesModel
    .find({ author: authorId })
    .populate("comments")
    .populate("likes")
    .exec()
    .then((articles) => {
      //console.log(articles.length === 0);
      if (articles.length === 0) {
        return res.status(404).json({
          success: false,
          message: `The author: ${authorId} has no articles`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the articles for the author: ${authorId}`,
        articles: articles,
        userId: authorId,
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

// This function returns article by its id
const getArticleById = (req, res) => {
  let id = req.params.id;
  articlesModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The article ${id} `,
        article: article,
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

// This function creates new article
const createNewArticle = (req, res) => {
  const { description, pic } = req.body;
  const author = req.token.userId;
  const userName = req.token.author;
  const authorPic = req.token.authorPic
  const newArticle = new articlesModel({
    description,
    pic,
    author,
    userName,
    authorPic
  });

  newArticle
    .save()
    .then((article) => {
      res.status(201).json({
        success: true,
        message: `Article created`,
        article: article,
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

// This function updates article by its id
const updateArticleById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  articlesModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newArticle) => {
      if (!newArticle) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Article updated`,
        article: newArticle,
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

// This function deletes a specific article by its id
const deleteArticleById = (req, res) => {
  const id = req.params.id;
  articlesModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Article deleted`,
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

// This function deletes all the articles for a specific author
const deleteArticlesByAuthor = (req, res) => {
  const author = req.params.id;
  articlesModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Deleted articles for the author: ${author}`,
        result,
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
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
