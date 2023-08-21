const express = require("express");
const { register, login } = require("../controllers/users");

// define router
const usersRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/users/register
 * POST -> http://localhost:5000/users/login
 */

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;
