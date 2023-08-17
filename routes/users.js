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
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/profile", verifyToken, updateUserProfile); 
router.patch("/:id/profile/views", verifyToken, incrementProfileViews);

export default router;