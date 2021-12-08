const { Router } = require("express");

const router = Router();

const controller = require("./register");

router.post("/register", controller.POST);

module.exports = router;
