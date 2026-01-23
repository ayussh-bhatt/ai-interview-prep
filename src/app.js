import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/response", responseRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/analytics", analyticsRoutes);





app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

export default app;
