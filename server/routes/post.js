import express from "express";
import { createPost, updatePost, deletePost, getUserPost, likePost, unlikePost, getUserPostDetails, totalPosts } from "../controllers/post";
import { requireSignin } from "../middlewares/auth";
import { canEditDeletePost } from "../middlewares/post";

const router = express.Router();

// ENDPOINTS

router.post('/create-post', requireSignin, createPost);

router.get('/user-posts/:page', requireSignin, getUserPost);

router.get('/user-post/:id', requireSignin, getUserPostDetails);

router.put('/update-post/:id', requireSignin, canEditDeletePost, updatePost);

router.delete('/delete-post/:id', requireSignin, canEditDeletePost, deletePost);

router.put('/like-post', requireSignin, likePost);

router.put('/unlike-post', requireSignin, unlikePost);

router.get('/total-posts', requireSignin, totalPosts);

module.exports = router;