const { fetch } = require("../../utils/pg");

const CREATED_COMMENT =
  "INSERT INTO comments (comment_name, comment_post, comment_author) VALUES ($1, $2, $3) RETURNING comment_id, comment_date, comment_name, comment_post, comment_author, comment_ref_id";
const CREATED_COMMENT_COMMENT =
  "INSERT INTO comments (comment_name, comment_post, comment_author, comment_ref_id) VALUES ($1, $2, $3, $4) RETURNING comment_id, comment_date, comment_name, comment_post, comment_author, comment_ref_id";
const DELETED_COMMENT =
  "UPDATE comments SET comment_status = '!active' WHERE comment_id = $1 AND comment_author = $2 RETURNING comment_id";

const createComment = (...values) => fetch(CREATED_COMMENT, values);
const createCommentComment = (...values) =>
  fetch(CREATED_COMMENT_COMMENT, values);
const deletedComment = (...values) => fetch(DELETED_COMMENT, values);

module.exports = { createComment, createCommentComment, deletedComment };
