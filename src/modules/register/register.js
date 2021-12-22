const model = require("./model");
const { sign } = require("../../utils/jwt");
const { hashPassword } = require("../../utils/bcrypt");
const { ee } = require("../../event/event");

module.exports = {
  ee,

  POST: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName && !lastName && !email && !password)
        return res.status(400).json({ message: "Bad request!" });

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return res
          .status(400)
          .json({ message: `This is not email (${email})` });

      if (
        !password.match(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,17}$/
        )
      )
        return res.status(400).json({
          message:
            "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, belgi, son bo'lishi kerak!",
        });

      const hashedPassword = await hashPassword(password);

      const createdUser = await model.createdUser(
        firstName,
        lastName,
        email,
        hashedPassword
      );

      if (!createdUser.user_id)
        return res.status(500).json({ message: "Server Error!" });

      const token = sign({ userId: createdUser.user_id });

      ee.emit("CREATE_USER", createdUser);

      res.status(201).json({ message: "User created!", token });
    } catch (error) {
      res.status(400).json({ message: "Bad request!" });
    }
  },
};
