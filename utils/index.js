const createUserRef = userDocs => {
  return userDocs.reduce((acc, userObj) => {
    acc[userObj.username] = userObj._id;
    return acc;
  }, {});
};

const createArticleRef = articleDocs => {
  return articleDocs.reduce((acc, articleObj) => {
    acc[articleObj.title] = articleObj._id;
    return acc;
  }, {});
};

const formatArticleData = (articleData, userRef) => {
  return articleData.map(articleDatum => {
    return {
      ...articleDatum,
      belongs_to: articleDatum.topic,
      created_by: userRef[articleDatum.created_by]
    };
  });
};

const formatCommentData = (commentData, userRef, articleRef) => {
  return commentData.map(commentDatum => {
    return {
      ...commentDatum,
      belongs_to: articleRef[commentDatum.belongs_to],
      created_by: userRef[commentDatum.created_by]
    };
  });
};
module.exports = {
  createUserRef,
  createArticleRef,
  formatArticleData,
  formatCommentData,
};


