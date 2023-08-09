import express from "express";
import { getCourt, getFeedCourts, getPostCourt } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/",  getFeedCourts); //verifyToken,
router.get("/:id",  getCourt); //verifyToken,
router.get("/:id/court",  getPostCourt); //verifyToken,

export default router;