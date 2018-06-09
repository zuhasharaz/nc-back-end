const articleRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  addComment,
  getCommentsByArticleId,
  increaseArticleVote
} = require("../controllers/articles");

articleRouter
.route("/")
.get(getArticles)

articleRouter.route("/:article_id")
.get(getArticleById)

articleRouter
.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(addComment);
  
  articleRouter
  .route('/article_id?')
  .put(increaseArticleVote)


module.exports = articleRouter;