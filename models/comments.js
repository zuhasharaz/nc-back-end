const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  belongs_to: {
    type: mongoose.Types.Schema.ObjectId,
    ref: 'articles',
    required: true
  },
  created_at: {
    type: Number,
    default: new Date().getTime()
  },
  votes: {
    type: Number,
    default: 0
  },
  created_by: {
    type: mongoose.Types.Schema.ObjectId,
    ref: 'users',
    required: true
  }
});

module.exports = mongoose.model('comments', CommentSchema);
