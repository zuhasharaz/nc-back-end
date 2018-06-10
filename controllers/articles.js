const {Article, Comment}  = require("../models");


exports.getArticles = (req, res, next) =>  {
  Article.find()
    .lean()
    .then(allArticles => {
      const commentsCountPromises = allArticles.map(article => {
        return Comment.count({
          belongs_to: article._id
        });
      });
      return Promise.all([allArticles, ...commentsCountPromises]);
    })
    .then(([articles, ...commentsCounts]) => {
      articles.forEach((article, i) => {
        article.comments = commentsCounts[i];
      });
      if (articles.length === 0) return next({ status: 404 })
      res.send({ articles })
    })
    .catch(next);
}

exports.getArticleById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .populate('created_by', 'username -_id')
    .then((article) => {
      const articleData = {
        _id: article._id,
        title: article.title,
        body: article.body,
        created_by: article.created_by.username,
        topic: article.topic,
        votes: article.votes
      };
      if(articles.length === 0) return next({ status: 404 })
      res.send({articleData});
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id })
    .populate('created_by')
    .then((commentData) => {
      const comments = commentData.map((comment) => {
        let { _id, body, votes } = comment;
        return {
          _id,
          body,
          belongs_to: req.params.article_id,
          created_by: comment.created_by.username,
          votes,
          created_at: comment.created_at
        };
      });
      return comments;
    })
    .then((comments) => {
      
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const newComment = new Comment({
    body: req.body.body,
    belongs_to: req.params.article_id,
    created_by: req.body.created_by
  });
  return newComment
    .save()
    .then(newComment => {
      res.status(201).json(newComment);
    })
    .catch(next);
}



exports.increaseArticleVote = (req, res, next) => {
  // if (vote !== "up" && vote !== "down")
  //   return next({
  //     status: 500,
  //     message: `INTERNAL SERVER ERR`
  //   });
  let voteCount = 0;
  if (req.query.vote === "up") voteCount++;
  if (req.query.vote === "down") voteCount--;
  if (req.query.vote !== "up" && req.query.vote !== "down")
    return next({ status: 400 });
  Article.findByIdAndUpdate(
    { _id: req.params.article_id },
    { $inc: { votes: voteCount } },
    { new: true }
  )
    .then(article => {
      res.status(201).send(article);
    })
    .catch(next);
};

