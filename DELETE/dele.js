const UserSchema = new mongoose.Schema({
    username: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })


const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;

  // {
  //   _id: 59ab1c92ea84486fb4ba9f28,
  //   username: JD,
  //   posts: [
  //     "59ab1b43ea84486fb4ba9ef0",
  //     "59ab1b43ea84486fb4ba9ef1"
  //   ]
  // }

  function getUserWithPosts(username){
    return User.findOne({ username: username })
      .populate('posts')
      .exec((err, posts) => {
        console.log("Populated User " + posts);
      })
  }

  // {
  //   _id: 59ab1c92ea84486fb4ba9f28,
  //   username: 'JD',
  //   posts:
  //     [
  //       {
  //         _id: 59ab1b43ea84486fb4ba9ef0,
  //         content: "Is it dark out?"
  //       },{
  //         _id: 59ab1b43ea84486fb4ba9ef1,
  //         content: "Hey anyone got a cup of sugar?"
  //       }
  //     ]
  //   }
