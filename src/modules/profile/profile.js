const model = require("./model");
const { verify } = require("../../utils/jwt");
const fs = require("fs");
const path = require("path");

module.exports = {
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
      console.log(error.message);
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  POST_CREATE: async (req, res) => {
    try {
      const { name } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);
      if (!name || !userId || !req.files.length)
        return res.status(400).json({ message: "Bad request!" });

      let medias = req.files.map((e) => (e = e.filename));

      const createPost = await model.createPost(name, medias, userId);

      if (!createPost) return res.status(400).json({ message: "Bad request!" });

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

      deletedPost.post_media.forEach((media) => {
        fs.unlink(path.join(__dirname, "../../uploads", media), (er) => {
          console.log(er);
        });
      });

      res
        .status(200)
        .json({ message: "Post deleted!", deletedPost: deletedPost.post_id });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  PROFILE_UPDATE: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const { token } = req.headers;
      const { userId } = verify(token);

      if ((!firstName && !lastName && !req.file) || !userId)
        return res.status(400).json({ message: "Bad request!" });

      const getUser = await model.getUser(userId);

      if (!getUser) return res.status(400).json({ message: "Bad request!" });

      const updateUser = await model.updateUser(
        firstName || getUser.user_firstname,
        lastName || getUser.user_lastname,
        req.file ? req.file.filename : getUser.user_image,
        userId
      );

      if (!updateUser) return res.status(400).json({ message: "Bad request!" });

      if (req.file) {
        fs.unlink(
          path.join(__dirname, "../../uploads", getUser.user_image),
          (er) => {
            console.log(er);
          }
        );
      }

      res.status(200).json({ message: "Profile update", updateUser });
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

      fs.unlink(
        path.join(__dirname, "../../uploads", deletedUser.user_image),
        (er) => {
          console.log(er);
        }
      );

      res
        .status(200)
        .json({ message: "exit", deletedUser: deletedUser.user_id });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
};
