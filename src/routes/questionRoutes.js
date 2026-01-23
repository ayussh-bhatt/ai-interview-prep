import express from "express";
import { generateSessionQuestions } from "../controllers/questionController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authenticate, generateSessionQuestions);

export default router;
