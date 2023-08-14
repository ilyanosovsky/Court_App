import express from 'express';
import { getFeedPosts, getUserPosts, likePost, joinMatch, cancelMatch } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get("/",  getFeedPosts); //verifyToken,
router.get("/:userId/posts",  getUserPosts); //verifyToken,

// UPDATE
router.patch("/:id/like",  likePost); //verifyToken,
router.patch("/:id/join",  joinMatch); //verifyToken,
router.patch("/:id/cancel", cancelMatch); // Add this line

export default router;