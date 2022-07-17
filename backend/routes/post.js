const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');

router.get('/', postCtrl.getAllPosts);
router.post('/', multer, postCtrl.createPost);
router.get('/:id',postCtrl.getOnePost);
router.put('/:id', multer, postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', likeCtrl.likePost);

module.exports = router; 