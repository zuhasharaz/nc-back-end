module.exports = {

  'GET /api': 'Returns a list of all the available end points',

  'GET /api/topics': 'Returns a list of all the topics',

  'POST /api/topics': 'Posts a new topic',

  'GET /api/topics/:topic/articles': 'Returns all of the articles for a given topic',

  'POST /api/topics/:topic/articles': 'Posts a new article for a given topic ',

  'GET /api/articles': 'Returns all of the articles',

  'GET /api/articles/:article_id': 'Return an article for a given aritcle id',

  'GET /api/articles/:article_id/comments': 'Returns all of the comments for a given article id',

  'POST /api/articles/:article_id/comments': 'Posts a new comment for a given article id',

  'PUT /api/articles/:article_id': 'Updates votes property for a given article id',

  'PUT /api/comments/:comment_id': 'Updates votes property of given comment id',

  'DELETE /api/comments/:comment_id': 'deletes a given comment for given id and returns an empty object',

  'GET /api/users/': 'Returns a list of all the users',

  'GET /api/users/:username': 'Returns a user profile for a given username',

  'GET /api/users/:username/articles': 'Returns a list of all the articles posted by given username'

}