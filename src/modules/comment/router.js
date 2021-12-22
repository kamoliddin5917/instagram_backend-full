const { Router } = require("express");

const router = Router();

const controller = require("./comment");

router

  .post("/comment/:commentId?", controller.POST)

  .delete("/comment/:commentId", controller.DELETE);

module.exports = router;
