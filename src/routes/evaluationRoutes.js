import express from "express";
import { evaluateResponse } from "../controllers/evaluationController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/run", authenticate, evaluateResponse);

export default router;
