const { Router } = require("express");

const router = Router();

const register = require("../modules/register/router");
const login = require("../modules/login/router");
const profile = require("../modules/profile/router");
const home = require("../modules/home/router");
const comment = require("../modules/comment/router");

router.use("/auth", register);
router.use("/auth", login);
router.use("/api", profile);
router.use("/api", home);
router.use("/api", comment);

module.exports = router;
