import prisma from "../config/prisma.js";

export const upsertUserProfile = async (req, res) => {
  try {
    const userId = req.user.uid; // Firebase UID
    const { role, experienceLevel } = req.body;

    if (!role || !experienceLevel) {
      return res.status(400).json({
        error: "Role and experienceLevel are required",
      });
    }

    // Find internal user
    const user = await prisma.user.findUnique({
      where: { firebaseUid: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create or update profile
    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { role, experienceLevel },
      create: {
        userId: user.id,
        role,
        experienceLevel,
      },
    });

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
