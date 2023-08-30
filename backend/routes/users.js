const express = require("express");
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controllers/users");

// define router
const usersRouter = express.Router();
const { follow ,unFollow,noti} = require("./../controllers/friends");
const authentication = require("../middleware/authentication");
/*
 * Testing Routes:
 * POST -> http://localhost:5000/users/register
 * POST -> http://localhost:5000/users/login
 * POST -> http://localhost:5000/users/follow/22
 * DELETE->http://localhost:5000/users/follow/22
 * DELETE->http://localhost:5000/users/notifications/22
 * get ->  http://localhost:5000/users/
 * get ->  http://localhost:5000/users/:id
 * put ->  http://localhost:5000/users/:id
 */

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", authentication, getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserById);
usersRouter.post("/follow/:idUser",authentication, follow);
usersRouter.delete("/follow/:idUser",authentication, unFollow);
usersRouter.delete("/notifications/:notiId",authentication, noti);

module.exports = usersRouter;
