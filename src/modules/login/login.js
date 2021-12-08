const model = require("./model");
const { sign } = require("../../utils/jwt");
const { comparePassword } = require("../../utils/bcrypt");

module.exports = {
  POST: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Bad request!" });

      const findUser = await model.findUser(email);

      if (!findUser) return res.status(400).json({ message: "Bad request!" });

      const comparePass = await comparePassword(
        password,
        findUser.user_password
      );

      if (!comparePass)
        return res.status(400).json({ message: "Bad request!" });

      const token = sign({ userId: findUser.user_id });

      res.status(200).json({ message: "User find!", token });
    } catch (error) {
      res.status(500).json({ message: "Server ERROR!" });
    }
  },
};
