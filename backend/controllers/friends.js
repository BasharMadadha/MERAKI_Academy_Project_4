const usersModel = require("../models/users");

const follow = (req, res) => {
  const idUser = req.params.idUser;
  const userId = req.token.userId;
  const userName = req.token.author;
  const userPic = req.token.authorPic;

  usersModel
    .findById(idUser)
    .then((result) => {
      //console.log(result);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else if (
        result.friends.find((friend) => friend.user.toString() === userId)
      ) {
        return res.status(400).json({
          success: false,
          message: "You already follow this user",
        });
      } else {
        result.friends.push({
          user: userId,
          userName: userName,
          userPic: userPic,
        });
        result.save();
        res.status(201).json({
          success: true,
          message: "friends added",
          follower: result.friends,
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

module.exports = {
  follow,
};
