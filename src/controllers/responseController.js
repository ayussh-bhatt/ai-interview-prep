import prisma from "../config/prisma.js";

export const submitVideoResponse = async (req, res) => {
  try {
    const { sessionId, questionId, videoUrl } = req.body;

    if (!sessionId || !questionId || !videoUrl) {
      return res.status(400).json({
        error: "sessionId, questionId and videoUrl are required",
      });
    }

    // Validate session
    const session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ error: "Interview session not found" });
    }

    // Validate question
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Save response
    const response = await prisma.response.create({
      data: {
        sessionId,
        questionId,
        videoUrl,
      },
    });

    return res.status(201).json({
      responseId: response.id,
      message: "Video response submitted successfully",
    });
  } catch (error) {
    console.error("Video response error:", error);
    return res.status(500).json({ error: "Failed to submit response" });
  }
};
