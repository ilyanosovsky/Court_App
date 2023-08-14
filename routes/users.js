import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    updateUserProfile,
    incrementProfileViews,
    incrementPostImpressions
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser); // verifyToken,
router.get("/:id/friends", verifyToken, getUserFriends);// verifyToken,

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);// verifyToken,
router.patch("/:id/profile", verifyToken, updateUserProfile); // verifyToken,// Update user profile information
router.patch("/:id/profile/views", verifyToken, incrementProfileViews); // verifyToken,// Increment profile views
router.patch("/post/impressions", verifyToken, incrementPostImpressions); // verifyToken,// Increment post impressions

export default router;