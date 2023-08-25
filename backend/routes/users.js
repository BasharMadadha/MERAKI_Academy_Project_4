const express = require("express");
const { register, login, getAllUsers,getUserById,
    updateUserById } = require("../controllers/users");

// define router
const usersRouter = express.Router();

const authentication = require("../middleware/authentication");
/*
 * Testing Routes:
 * POST -> http://localhost:5000/users/register
 * POST -> http://localhost:5000/users/login
 * get -> http://localhost:5000/users/
 * get -> http://localhost:5000/users/:id
 * put -> http://localhost:5000/users/:id
 */

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", authentication, getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserById);

module.exports = usersRouter;
