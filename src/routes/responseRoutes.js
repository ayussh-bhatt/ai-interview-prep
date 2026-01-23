import express from "express";
import { submitVideoResponse } from "../controllers/responseController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/video", authenticate, submitVideoResponse);

export default router;
