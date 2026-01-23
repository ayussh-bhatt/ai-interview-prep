import prisma from "../config/prisma.js";
import { getUserAnalytics } from "../services/analyticsService.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;

    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const analytics = await getUserAnalytics(user.id);

    return res.status(200).json(analytics);
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ error: "Failed to load analytics" });
  }
};
