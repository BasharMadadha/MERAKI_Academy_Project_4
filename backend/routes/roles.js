const express = require("express");

// Import roles controller
const { createNewRole } = require("../controllers/roles");

// Create roles router
const rolesRouter = express.Router();

/*
 * Testing Routes:
 * POST -> http://localhost:5000/roles/
 */

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
