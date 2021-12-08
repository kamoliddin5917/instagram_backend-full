const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/server");

module.exports = {
  sign: (data) => jwt.sign(data, JWT_KEY),
  verify: (data) => jwt.verify(data, JWT_KEY),
};
