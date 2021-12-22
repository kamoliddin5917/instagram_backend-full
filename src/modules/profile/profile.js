const model = require("./model");
const { verify } = require("../../utils/jwt");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const { ee } = require("../../event/event");
// const fs = require("fs");
// const path = require("path");

module.exports = {
  ee,

  GET: async (req, res) => {
    try {
      const { token } = req.headers;
      const { userId } = verify(token);

      if (!userId) return res.status(400).json({ message: "Bad request!" });

      const getUser = await model.getUser(userId);

      if (!getUser) return res.status(400).json({ message: "Bad request!" });

      const getPosts = await model.getPosts(userId);
      const getComments = await model.getComments();

      res.status(200).json({
        message: "ok",
        profile: { user: getUser, posts: getPosts, comments: getComments },
      });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  POST_CREATE: async (req, res) => {
    try {
      const { name, media } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);
      if (!name || !userId || !media)
        return res.status(400).json({ message: "Bad request!" });

      // let medias = req.files.map((e) => (e = e.filename));
      let medias = [media];

      const createPost = await model.createPost(name, medias, userId);

      if (!createPost) return res.status(400).json({ message: "Bad request!" });

      ee.emit("CREATE_POST", createPost);

      res.status(201).json({ message: "Post created!", createPost });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  POST_UPDATE: async (req, res) => {
    try {
      const { name, postId } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);

      if (!name || !userId || !postId)
        return res.status(400).json({ message: "Bad request!" });

      const updatePost = await model.updatePost(name, postId, userId);

      if (!updatePost) return res.status(400).json({ message: "Bad request!" });

      res.status(200).json({ message: "Post update!", updatePost });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  POST_DELETE: async (req, res) => {
    try {
      const { postId } = req.params;
      const { token } = req.headers;
      const { userId } = verify(token);

      if (!postId || !userId)
        return res.status(400).json({ message: "Bad request!" });

      const deletedPost = await model.deletedPost(postId, userId);

      if (!deletedPost)
        return res.status(400).json({ message: "Bad request!" });

      // deletedPost.post_media.forEach((media) => {
      //   fs.unlink(path.join(__dirname, "../../uploads", media), (er) => {
      //     console.log(er);
      //   });
      // });

      res.status(200).json({ message: "Post deleted!", deletedPost });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  PROFILE_UPDATE: async (req, res) => {
    try {
      const { firstName, lastName, image } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);

      if ((!firstName && !lastName && !image) || !userId)
        return res.status(400).json({ message: "Bad request!" });

      const getUser = await model.getUser(userId);

      if (!getUser) return res.status(400).json({ message: "Bad request!" });

      const updateUser = await model.updateUser(
        firstName || getUser.user_firstname,
        lastName || getUser.user_lastname,
        image || getUser.user_image,
        userId
      );

      if (!updateUser) return res.status(400).json({ message: "Bad request!" });

      // if (req.file) {
      //   fs.unlink(
      //     path.join(__dirname, "../../uploads", getUser.user_image),
      //     (er) => {
      //       console.log(er);
      //     }
      //   );
      // }

      const img = image ? getUser.user_image : null;

      res.status(200).json({ message: "Profile update", updateUser, img: img });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  EXIT: async (req, res) => {
    try {
      const { token } = req.headers;
      const { userId } = verify(token);
      if (!userId) return res.status(400).json({ message: "Bad request!" });

      const deletedUser = await model.deletedUser(userId);

      if (!deletedUser)
        return res.status(400).json({ message: "Bad request!" });

      // fs.unlink(
      //   path.join(__dirname, "../../uploads", deletedUser.user_image),
      //   (er) => {
      //     console.log(er);
      //   }
      // );

      res.status(200).json({ message: "exit", deletedUser });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  PASSWORD_UPDATE: async (req, res) => {
    try {
      const { email, oldPassword, newPassword, newPasswordTwo } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);
      if (
        !userId ||
        !email ||
        !oldPassword ||
        !newPassword ||
        !newPasswordTwo ||
        newPassword !== newPasswordTwo ||
        oldPassword === newPassword
      )
        return res.status(400).json({ message: "Bad request!" });

      if (
        !newPassword.match(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,17}$/
        )
      )
        return res.status(400).json({
          message:
            "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, belgi, son bo'lishi kerak!",
        });

      const password = await model.password(email, userId);

      if (!password) return res.status(400).json({ message: "Bad request!" });

      const pass = await comparePassword(oldPassword, password.user_password);

      if (!pass) return res.status(400).json({ message: "Bad request!" });

      const hashedPassword = await hashPassword(newPassword);

      const updatePassword = await model.updatePassword(hashedPassword, userId);

      if (!updatePassword)
        return res.status(500).json({ message: "Server error!" });

      res.status(200).json({ message: "Password update", updatePassword });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
};
