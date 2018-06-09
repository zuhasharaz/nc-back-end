const router = require("express").Router();
const { getTopics, getArticleByTopic , addArticle}  = require("../controllers/topics")

router
  .route("/")
  .get(getTopics)

  router.route ("/:topic/articles")
  .get(getArticleByTopic)
  .post(addArticle)

  
module.exports = router;
