import prisma from "../config/prisma.js";

export const verifyUser = async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });

    // If not, create user
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          email,
          name,
        },
      });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Auth verify error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
