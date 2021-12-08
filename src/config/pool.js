require("dotenv").config();
module.exports = {
  connectionString: `postgres://postgres:${process.env.DB_KEY}@localhost:5432/instagram`,
  connectionStringEl: process.env.DB_URL,
};
