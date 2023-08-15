import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    incrementProfileViews,
    updateUserProfile
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get("/:id",  getUser); // verifyToken,
router.get("/:id/friends",  getUserFriends);// verifyToken,

// UPDATE
router.patch("/:id/:friendId",  addRemoveFriend);// verifyToken,
router.patch("/profile",  updateUserProfile); // verifyToken,// Update user profile information
router.patch("/:id/profile/views",  incrementProfileViews); // verifyToken,// Increment profile views

export default router;