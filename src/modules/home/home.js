const model = require("./model");

module.exports = {
  GET: async (_, res) => {
    try {
      const users = await model.users();
      const posts = await model.posts();
      const comments = await model.comments();

      res.status(200).json({ message: "ok", data: { users, posts, comments } });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
};
