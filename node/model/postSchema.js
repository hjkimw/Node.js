const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  communityNum: Number,
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collection: 'Posts' });

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };