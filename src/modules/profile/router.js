const { Router } = require("express");
// const { upload } = require("../../utils/multer");

const router = Router();

const controller = require("./profile");

router
  .get("/profile", controller.GET)

  // .post("/profile/post",upload.array("media"),controller.POST_CREATE)
  .post("/profile/post", controller.POST_CREATE)

  // .put("/profile",  upload.single("image"), controller.PROFILE_UPDATE)
  .put("/profile", controller.PROFILE_UPDATE)
  .put("/profile/post", controller.POST_UPDATE)
  .put("/profile/password", controller.PASSWORD_UPDATE)

  .delete("/profile/post/:postId", controller.POST_DELETE)
  .delete("/profile", controller.EXIT);

module.exports = router;
