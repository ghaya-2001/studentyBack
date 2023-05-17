const Post = require('../model/posts');

exports.createPost = async (req, res, next) => {
  const post = new Post(req.body);
  try {
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'Posts fetched successfully', posts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
}
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const updatedPostData = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Update the post with the new data
    post.set(updatedPostData);
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error });
  }
};