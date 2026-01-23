import prisma from "../config/prisma.js";

export const startInterviewSession = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;

    // Find internal user
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
      include: { profile: true },
    });

    if (!user || !user.profile) {
      return res.status(400).json({
        error: "User profile not found. Please set role and experience first.",
      });
    }

    const session = await prisma.interviewSession.create({
      data: {
        userId: user.id,
        role: user.profile.role,
        experienceLevel: user.profile.experienceLevel,
      },
    });

    return res.status(201).json({
      sessionId: session.id,
      status: session.status,
      startedAt: session.startedAt,
    });
  } catch (error) {
    console.error("Start interview error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
