import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'; //as we are in the backend we will write auth.js

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); // Now we will get this data from controllers
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); //patching becuase liking post is also a updating a post by increasing the no. of counts

export default router;

// for posts to only be liked once we will have to do something more in the controllers
// but for deleting and updating we can do it in the frontend side  