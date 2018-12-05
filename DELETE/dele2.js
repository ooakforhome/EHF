const PostSchema = new mongoose.Schema({
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

const Post = mongoose.model('Post', PostSchema, 'posts');

module.exports = Post;
