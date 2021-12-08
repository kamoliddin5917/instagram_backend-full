const { Router } = require("express");

const router = Router();

const controller = require("./login");

router.post("/login", controller.POST);

module.exports = router;
