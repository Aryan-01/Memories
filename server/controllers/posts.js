import mongoose from 'mongoose';
import express from 'express';
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;    // here we are requesting the body from the client side
    
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    // now we need to request it from the client side to get the id first and then the post so first we need to keep track of 
    // the current id in app.js of client because we have to share that current state of Id b/w the post and the form
    // and app.js is the only parent component i.e, parent to both posts and form and later on we will do it using redux
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))   return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message : 'Post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    // first we check if the user is authenticated we can do this directly by req.userId since it must be populated before
    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if(!mongoose.Types.ObjectId.isValid(id))   return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    // then we check if the userId is already in the like post section
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new : true });

    res.json(updatedPost);
}

export default router;