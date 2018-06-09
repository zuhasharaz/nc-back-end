const commentsRouter = require("express").Router();
const {
  getComments,
  getCommentsById,
  deleteCommentById
} = require("../controllers/comments");


commentsRouter
.route("/")
.get(getComments);


commentsRouter
.route("/:comment_id")
.get(getCommentsById)
.delete(deleteCommentById)



module.exports = commentsRouter;
