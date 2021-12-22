const model = require("./model");
const { verify } = require("../../utils/jwt");
const { ee } = require("../../event/event");

module.exports = {
  ee,

  POST: async (req, res) => {
    try {
      const { commentId } = req.params;
      const { token } = req.headers;
      const { userId } = verify(token);
      const { comment, postId } = req.body;

      if (!comment || !userId || !postId)
        return res.status(400).json({ message: "Bad request!" });

      if (commentId) {
        const createCommentComment = await model.createCommentComment(
          comment,
          postId,
          userId,
          commentId
        );

        if (!createCommentComment)
          return res.status(400).json({ message: "Bad request!" });

        ee.emit("CREATE_COMMENT", createCommentComment);

        return res
          .status(201)
          .json({ message: "Comment created!", createCommentComment });
      }

      const createComment = await model.createComment(comment, postId, userId);

      if (!createComment)
        return res.status(400).json({ message: "Bad request!" });

      ee.emit("CREATE_COMMENT", createComment);

      res.status(201).json({ message: "Comment created!", createComment });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
  DELETE: async (req, res) => {
    try {
      const { commentId } = req.params;
      const { token } = req.headers;
      const { userId } = verify(token);

      if (!commentId || !userId)
        return res.status(400).json({ message: "Bad request!" });

      const deletedComment = await model.deletedComment(commentId, userId);

      if (!deletedComment)
        return res.status(400).json({ message: "Bad request!" });

      res.status(200).json({
        message: "Comment deleted!",
        deletedComment: deletedComment.comment_id,
      });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
};
