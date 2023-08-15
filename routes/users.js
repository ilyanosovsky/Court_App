import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    // updateUserProfile,
    incrementProfileViews,
    incrementPostImpressions,
    updateUserFacebook
} from "../controllers/users.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get("/:id",  getUser); // verifyToken,
router.get("/:id/friends",  getUserFriends);// verifyToken,

// UPDATE
router.patch("/:id/:friendId",  addRemoveFriend);// verifyToken,
// router.patch("/:id/profile",  updateUserProfile); // verifyToken,// Update user profile information
router.patch("/facebook",  updateUserFacebook);
router.patch("/:id/profile/views",  incrementProfileViews); // verifyToken,// Increment profile views
router.patch("/post/impressions",  incrementPostImpressions); // verifyToken,// Increment post impressions

export default router;