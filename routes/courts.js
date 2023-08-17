import express from "express";
import { getCourt, getFeedCourts, getPostCourt } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", getFeedCourts);
router.get("/:id", verifyToken, getCourt);
router.get("/:id/court", verifyToken, getPostCourt);

export default router;