import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // Now we will get this data from controllers
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost); //patching becuase liking post is also a updating a post by increasing the no. of counts

export default router;