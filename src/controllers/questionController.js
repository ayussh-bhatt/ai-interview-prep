import prisma from "../config/prisma.js";
import { generateQuestions } from "../services/geminiService.js";

export const generateSessionQuestions = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Generate questions using Gemini
    const questions = await generateQuestions({
      role: session.role,
      experienceLevel: session.experienceLevel,
    });

    // Save questions and link to session
    const savedQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      const question = await prisma.question.create({
        data: {
          role: session.role,
          experienceLevel: session.experienceLevel,
          type: q.type,
          topic: q.topic,
          content: q.content,
        },
      });

      await prisma.sessionQuestion.create({
        data: {
          sessionId: session.id,
          questionId: question.id,
          order: i + 1,
        },
      });

      savedQuestions.push(question);
    }

    return res.status(201).json({
      sessionId,
      totalQuestions: savedQuestions.length,
    });
  } catch (error) {
    console.error("Question generation error:", error);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
};
