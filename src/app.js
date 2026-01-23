import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/question", questionRoutes);



app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

export default app;
