const commentsRouter = require("express").Router();
const {
  getComments,
  getCommentsById,
  deleteCommentById,
  increaseCommentVote
} = require("../controllers/comments");


commentsRouter
.route("/")
.get(getComments);


commentsRouter
.route("/:comment_id")
.get(getCommentsById)
.delete(deleteCommentById)

commentsRouter
.route("/comment_id?")
.put(increaseCommentVote);

module.exports = commentsRouter;
