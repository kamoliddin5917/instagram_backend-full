const { Router } = require("express");

const router = Router();

const controller = require("./home");
const auth = require("../../middlewares/auth");

router.get("/home", auth.AUTH, controller.GET);

module.exports = router;
