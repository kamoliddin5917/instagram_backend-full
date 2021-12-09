require("dotenv").config();
module.exports = {
  connectionString: `postgres://postgres:${process.env.DB_KEY}@localhost:5432/instagram`,
  connectionStringEl:
    "postgres://kayybttu:uocOgqeNdwViKYMVKXO0s0CwW5ZWGiWY@castor.db.elephantsql.com/kayybttu",
  // connectionStringEl: process.env.DB_URL,
};
