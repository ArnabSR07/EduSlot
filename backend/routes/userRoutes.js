const express = require("express");
const userRouter = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const { syncUser } = require("../controllers/userController");

userRouter.post("/sync", requireAuth, syncUser);

module.exports = userRouter;
