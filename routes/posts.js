import express from 'express';
import { getFeedPosts, getUserPosts, likePost, joinMatch, cancelMatch } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/join", verifyToken, joinMatch);
router.patch("/:id/cancel", verifyToken, cancelMatch);

export default router;