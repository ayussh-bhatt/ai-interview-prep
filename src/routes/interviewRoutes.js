import express from "express";
import { startInterviewSession } from "../controllers/interviewController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", authenticate, startInterviewSession);

export default router;
