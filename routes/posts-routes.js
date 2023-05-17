const express = require('express');
const postController = require('../controller/postsController');
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id', postController.deletePost);
router.put('/:postId', postController.updatePost);

module.exports = router;