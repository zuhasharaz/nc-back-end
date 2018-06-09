const { Comment } = require("../models")

exports.getComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};



exports.getCommentsById = (req, res, next) => {
  let id = req.params.comment_id
  Comment.findOne({ _id: id })
    .then(comment => {
   comment === null 
      ? next({ status: 404, msg: `comment  for ${id} is not found` }) 
      : res.send({ comment });
    })
    .catch(next);
};


exports.deleteCommentById = (req, res, next) => {
  if (req.params.comment_id.length !== 24) return next({ status: 400 });
  Comment.findByIdAndRemove(req.params.comment_id)
    .then((deleteComment) => {
      res.status(200).send({
       Message : `Successfully deleted comment, id:${deleteComment._id}`
      });
    })
    .catch(next);
};