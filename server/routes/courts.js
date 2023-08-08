import express from "express";
import { getCourt, getFeedCourts } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/",  getFeedCourts); //verifyToken,
router.get("/:id",  getCourt); //verifyToken,

export default router;