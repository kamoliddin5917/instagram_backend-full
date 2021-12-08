const { verify } = require("../utils/jwt");

module.exports = {
  AUTH: (req, res, next) => {
    try {
      if (req.url === "/auth/login" || req.url === "/auth/register") {
        next();
      } else {
        const { token } = req.headers;
        const { userId } = verify(token);
        if (userId) {
          next();
        } else {
          res.status(401).json({
            message:
              "Login qilin, Registratsiyadan o'tmagan bo'sez Registeratsiya qilin!",
          });
        }
      }
    } catch (error) {
      res.status(401).json({
        message:
          "Login qilin, Registratsiyadan o'tmagan bo'sez Registeratsiya qilin!",
      });
    }
  },
};
