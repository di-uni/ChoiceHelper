import express from "express";

// import { getPosts, createPosts } from "../controllers/posts.js"
import { getRecentPosts, getCount, createPosts } from "../controllers/posts.js"
// import { getPosts, createPosts, countPosts } from "../controllers/posts.js"

const router = express.Router();

// localhost:5000/posts
// router.get('/', getAllPosts);
router.get('/', getRecentPosts);
router.get('/count', getCount);
router.post('/', createPosts);
// router.get('/count', countPosts);

export default router;