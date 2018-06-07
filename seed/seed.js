const mongoose = require("mongoose");
mongoose.Promise = Promise;

const {Topic, User , Article, Comment} = require("../models");

const {
  createUserRef,
  createArticleRef,
  formatArticleData,
  formatCommentData
} = require("../utils");

const seedDB = ({ articleData, commentData, topicData, userData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const userRef = createUserRef(userDocs);
      return Promise.all([
        Article.insertMany(formatArticleData(articleData, userRef)),
        userRef
      ]);
    })
    .then(([articleDocs, userRef]) => {
      const articleRef = createArticleRef(articleDocs);
      return Comment.insertMany(
        formatCommentData(commentData, userRef, articleRef)
      );
    });
};
module.exports = seedDB;


