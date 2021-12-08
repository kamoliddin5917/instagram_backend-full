const { fetch, fetchAll } = require("../../utils/pg");

// POST
const GET_USER =
  "SELECT user_id, user_firstname, user_lastname, user_email, user_date, user_image FROM users WHERE user_id = $1 AND user_status = 'active'";
const GET_POSTS =
  "SELECT post_id, post_date, post_name, post_media, post_author FROM posts WHERE post_author = $1 AND post_status = 'active'";
const GET_COMMENTS = `SELECT 
comment_id, comment_date, comment_name, comment_post, comment_author, comment_ref_id
FROM comments 
WHERE comment_status = 'active'`;
const CREATED_POST =
  "INSERT INTO posts (post_name, post_media, post_author) VALUES ($1, $2, $3) RETURNING post_id, post_date, post_name, post_media, post_author";
const UPDATE_POST =
  "UPDATE posts SET post_name = $1  WHERE post_id = $2 AND post_author = $3 RETURNING post_id, post_date, post_name, post_media, post_author";
const DELETED_POST =
  "UPDATE posts SET post_status = '!active' WHERE post_id = $1 AND post_author = $2 RETURNING post_id, post_media";

// PROFILE
const UPDATE_PROFILE =
  "UPDATE users SET user_firstname = $1, user_lastname = $2, user_image = $3 WHERE user_id = $4 RETURNING user_firstname, user_lastname, user_image";
const DELETED_USER =
  "UPDATE users SET user_status = '!active' WHERE user_id = $1 RETURNING user_id, user_image";

//  POST
const getUser = (...values) => fetch(GET_USER, values);
const getPosts = (...values) => fetchAll(GET_POSTS, values);
const getComments = (...values) => fetchAll(GET_COMMENTS, values);
const createPost = (...values) => fetch(CREATED_POST, values);
const updatePost = (...values) => fetch(UPDATE_POST, values);
const deletedPost = (...values) => fetch(DELETED_POST, values);
// PROFILE
const updateUser = (...values) => fetch(UPDATE_PROFILE, values);
const deletedUser = (...values) => fetch(DELETED_USER, values);

module.exports = {
  getUser,
  getPosts,
  getComments,
  createPost,
  updatePost,
  deletedPost,
  updateUser,
  deletedUser,
};
