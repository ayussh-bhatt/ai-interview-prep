import express from "express";
import { getDashboardAnalytics } from "../controllers/analyticsController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticate, getDashboardAnalytics);

export default router;
