const { fetchAll } = require("../../utils/pg");

const GET_USERS =
  "SELECT user_id, user_firstname, user_lastname, user_email, user_date, user_image FROM users WHERE user_status = 'active'";
const GET_POSTS =
  "SELECT post_id, post_name, post_media, post_date, post_author FROM posts WHERE post_status = 'active'";
const GET_COMMENTS =
  "SELECT comment_id, comment_name, comment_date, comment_post, comment_author, comment_ref_id FROM comments WHERE comment_status = 'active'";

const users = (...values) => fetchAll(GET_USERS, values);
const posts = (...values) => fetchAll(GET_POSTS, values);
const comments = (...values) => fetchAll(GET_COMMENTS, values);

module.exports = { users, posts, comments };
