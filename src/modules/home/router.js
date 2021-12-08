const { Router } = require("express");

const router = Router();

const controller = require("./home");

router.get("/home", controller.GET);

module.exports = router;
