const { Router } = require("express");

const router = Router();

const controller = require("./comment");
const auth = require("../../middlewares/auth");

router

  .post("/comment/:commentId?", auth.AUTH, controller.POST)

  .delete("/comment/:commentId", auth.AUTH, controller.DELETE);

module.exports = router;
