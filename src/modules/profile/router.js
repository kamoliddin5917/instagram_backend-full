const { Router } = require("express");
const { upload } = require("../../utils/multer");

const router = Router();

const controller = require("./profile");
const auth = require("../../middlewares/auth");

router
  .get("/profile", auth.AUTH, controller.GET)

  .post(
    "/profile/post",
    auth.AUTH,
    upload.array("media"),
    controller.POST_CREATE
  )

  .put("/profile", auth.AUTH, upload.single("image"), controller.PROFILE_UPDATE)
  .put("/profile/post", auth.AUTH, controller.POST_UPDATE)
  .put("/profile/password", auth.AUTH, controller.PASSWORD_UPDATE)

  .delete("/profile/post/:postId", auth.AUTH, controller.POST_DELETE)
  .delete("/profile", auth.AUTH, controller.EXIT);

module.exports = router;
