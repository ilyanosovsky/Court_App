import express from "express";
import { getCourt, getFeedCourts } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedCourts);
router.get("/:id", verifyToken, getCourt);

export default router;