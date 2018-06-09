const { Topic , Article, User , Comment} = require("../models");;

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getArticleByTopic = (req, res, next) =>  {
  let articles;
  return Article.find({ belongs_to: req.params.topic }).lean().then((allArticles) => {
      articles = allArticles;
      let addCommentCount = allArticles.map((article) => {
        return Comment.find({ belongs_to: article._id }).count();
      });
      return Promise.all(addCommentCount);
    })
    .then((comments) => {
      articles.forEach(function (value, i) {
        value.comments = comments[i];
      })
      if (articles.length === 0) return next({ status: 404 })
      res.send({ articles })
    })
    .catch(console.log);
}


exports.addArticle = (req, res, next) => {

  console.log(req.body)
  const newArticle = new Article({
    title: req.body.title,
    body: req.body.body,
    created_by: req.body.created_by,
    belongs_to: req.params.topic
  });
  newArticle.save()
    .then((newArticle) => {
      res.status(201).send(newArticle);
    })
    .catch(next);
}

