const articleRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  addComment,
  getCommentsByArticleId,
  increaseArticleVote
} = require("../controllers/articles");

articleRouter.route("/").get(getArticles);

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .put(increaseArticleVote);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(addComment);

module.exports = articleRouter;
