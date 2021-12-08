const { fetch } = require("../../utils/pg");

const CREATED_USER =
  "INSERT INTO users (user_firstname, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING user_id";

const createdUser = (...values) => fetch(CREATED_USER, values);

module.exports = { createdUser };
