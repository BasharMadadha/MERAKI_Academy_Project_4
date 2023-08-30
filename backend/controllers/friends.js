const usersModel = require("../models/users");

const follow = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const userId = req.token.userId;
    const userName = req.token.author;
    const userPic = req.token.authorPic;

    const userToFollow = await usersModel.findById(idUser);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isAlreadyFollowing = userToFollow.followers.some(
      (follower) => follower.user.toString() === userId
    );
    if (isAlreadyFollowing) {
      return res.status(400).json({
        success: false,
        message: "You already follow this user",
      });
    }

    userToFollow.notifications.push({
      user: userId,
      userName: userName,
      userPic: userPic,
    });
    userToFollow.followers.push({
      user: userId,
      userName: userName,
      userPic: userPic,
    });
    await userToFollow.save();

    const currentUser = await usersModel.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isAlreadyFollowingCurrentUser = currentUser.following.some(
      (follower) => follower.user.toString() === idUser
    );
    if (isAlreadyFollowingCurrentUser) {
      return res.status(400).json({
        success: false,
        message: "You already follow this user",
      });
    }

    currentUser.following.push({
      user: idUser,
      userName: `${userToFollow.firstName} ${userToFollow.lastName}`,
      userPic: userToFollow.profilePicture,
    });
    await currentUser.save();

    return res.status(201).json({
      success: true,
      message: "Friends added",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const unFollow = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const userId = req.token.userId;

    const userToUnfollow = await usersModel.findById(idUser);

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: `The user with id => ${idUser} not found`,
      });
    }

    // Find the index of the follower by the specific user
    const followerIndex = userToUnfollow.followers.findIndex(
      (follow) => follow.user.toString() === userId
    );

    if (followerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Follower not found for the user`,
      });
    }

    // Remove the follower's entry from the followers array and notifications array
    userToUnfollow.followers.splice(followerIndex, 1);
    userToUnfollow.notifications.splice(followerIndex, 1);

    // Save the modified user
    await userToUnfollow.save();

    const currentUser = await usersModel.findById(userId);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: `The user with id => ${userId} not found`,
      });
    }

    // Find the index of the following by the specific user
    const followingIndex = currentUser.following.findIndex(
      (follow) => follow.user.toString() === idUser
    );

    if (followingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Following not found for the user`,
      });
    }

    // Remove the following's entry from the following array
    currentUser.following.splice(followingIndex, 1);

    // Save the modified current user
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: `Unfollowed the user`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

const noti = async (req, res) => {
  try {
    const notiId = req.params.notiId;
    const userId = req.token.userId;

    const notiDelete = await usersModel.findById(userId);
    if (!notiDelete) {
      return res.status(404).json({
        success: false,
        message: `The user with id => ${notiId} not found`,
      });
    }

    // Find the index of the follower by the specific user
    const notiIndex = notiDelete.notifications.findIndex(
      (noti) => noti._id.toString() === notiId
    );

    if (notiIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `notifications not found for the user`,
      });
    }

    // Remove the follower's entry from the followers array and notifications array
    notiDelete.notifications.splice(notiIndex, 1);

    // Save the modified user
    await notiDelete.save();

    res.status(200).json({
      success: true,
      message: `Deleted notifications the user`,
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
  follow,
  unFollow,
  noti
};
